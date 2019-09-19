import React from 'react';
import { connect } from 'react-redux';
import {getCategories} from '../public/redux/actions/categories';
import {addItem} from '../public/redux/actions/items';
import {getBranch} from '../public/redux/actions/branch';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import '../style/AddItem.css'; 
import Swal from 'sweetalert2';


class AddItem extends React.Component{
    state={
        branchList:[],
        categoryList:[],

        name:'',
        image:'',
        description:'',
        category:'',
        itemstock:[],

        user:{},
        token:'',
        header:''
    }

    componentDidMount = async () => {
        await this.setState({
            user:{
                id:localStorage.getItem('userID'),
                name:localStorage.getItem('userName'),
                email:localStorage.getItem('userEmail'),
                level:localStorage.getItem('userLevel'),
            },
            token:localStorage.getItem('token'),
        })
        const header = {headers:{'authorization':'Bearer '+this.state.token}};
        this.setState({header:header});

        await this.props.dispatch(getCategories())
        await this.setState({categoryList:this.props.categories})
        this.setState({category:this.state.categoryList[0].id})

        await this.props.dispatch(getBranch())
        await this.setState({branchList:this.props.branch})

        const tmp = [];
        this.state.branchList.map(bran => {
            tmp.push({
                branch:bran.id,
                price:0,
                quantity:0
            })
            return null;
        })
        this.setState({itemstock:tmp})
    }

    inputHandler = (event) => {
        this.setState({[event.target.name]:[event.target.value]})  
    }

    inputStockHandler = (event) => {
        const tmp = [];
        this.state.itemstock.map(i => {
            if(i.branch == event.target.id){// eslint-disable-line
                tmp.push({
                    ...i,
                    [event.target.name]:[event.target.value][0]
                })
            } else {
                tmp.push(i)
            }
            this.setState({itemstock:tmp})
            
            return null;
        })
    }

    handleSubmit = () => {
        const tmpStock = [];
        this.state.itemstock.map(stock => {
            if(stock.price > 0 && stock.quantity > 0){
                tmpStock.push(stock)
            }
            return null;
        })

        const data ={
            name:this.state.name[0],
            category:this.state.category,
            description:this.state.description[0],
            image:this.state.image[0],
            itemstock:tmpStock
        }
        
        
        this.props.dispatch(addItem(data,this.state.header));
        Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Item is successfully added.',
            showConfirmButton: false,
            timer: 800
        })
        setInterval(() => {
            window.location.reload();
        }, 800);
    }

    render(){
        return(
            <div>     
                <Form className='add-form'>
                
                    <FormGroup>
                        <Label for="ItemName" className='nameadd-label'>Product Name</Label>
                        <Input type="text" name="name" id="ItemName" className='nameadd-input' onChange={this.inputHandler}/>
                    </FormGroup>
                
                <FormGroup>
                    <Label for="category" className='cathegory-label'>Category</Label>
                    <Input type="select" name="category" id="category" className='cathegory-input' onChange={this.inputHandler}>
                        {this.state.categoryList.map(cate => 
                                <option key={cate.id} value={cate.id} >{cate.name}</option>
                        )}
                    </Input>
                </FormGroup>
                

                <FormGroup>
                    <Label for="imgURL" className='image-label'>Image URL</Label>
                    <Input type="text" name="image" id="imgURL" className='image-input' onChange={this.inputHandler}/>
                </FormGroup>

                {/*//spread  */}
                <FormGroup> 
                    <div>
                    <Label className='labelbranch'>Branch</Label>
                    <Label className='quantity-label'>Quantity</Label>
                    <Label className='price-label'>Price</Label>
                    <div className='allbranch-container' >
                        {this.state.branchList.map((bran,index) => {
                            return(
                                <div className='branch-container' key={index}>
                                    <Label>{bran.location}</Label>
                                    <div className='quantityprice-container'>
                                        <Input id={bran.id} name='quantity' className='quantity-input' onChange={this.inputStockHandler}/>
                                        <Input id={bran.id} name='price' className='price-input' onChange={this.inputStockHandler}/>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    
                    </div>
                </FormGroup>
                

                <FormGroup>
                    <Label for="ItemDesc" className='description-label'>Description</Label>
                    <Input type="textarea" name="description" id="ItemDesc" className='description-input' onChange={this.inputHandler}/>
                </FormGroup>

              <Button style={{marginTop:'18px'}} type="button" className='add-button-submit' onClick={this.handleSubmit
        }>Add</Button>
            </Form>
        </div> 
        )
    }
}
function mapStateToProps(state){
    return{
        branch: state.branch.branch,
        categories:state.categories.categories,
    }
}

export default connect(mapStateToProps)(AddItem);