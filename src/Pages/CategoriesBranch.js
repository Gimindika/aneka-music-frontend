import React from 'react';
import { connect } from 'react-redux';
import {getBranch , addBranch} from '../public/redux/actions/branch';
import {getCategories, addCategory} from '../public/redux/actions/categories';
import { async } from 'q';
import Swal from 'sweetalert2';

class CategoriesBranch extends React.Component {
    state={
        branchList:[],
        categoryList:[],

        categoryImage:'',
        categoryName:'',

        branchLocation:''
    }

    componentDidMount = async () => {
        await this.props.dispatch(getCategories())
        await this.setState({categoryList:this.props.categories})

        await this.props.dispatch(getBranch())
        await this.setState({branchList:this.props.branch})
    }

    inputHandler = (event) => {
        this.setState({[event.target.name]:[event.target.value][0]})
    }

    categorySubmit = async () => {
        const data = {
            name:this.state.categoryName,
            image:this.state.categoryImage
        }
    
        await this.props.dispatch(addCategory(data));
        Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Category is successfully added.',
            showConfirmButton: false,
            timer: 800
        })
        await this.setState({categoryList:this.props.categories})
    }

    branchSubmit = async () => {
        const data = {
            location:this.state.branchLocation
        }

        await this.props.dispatch(addBranch(data));
        Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Branch is successfully added.',
            showConfirmButton: false,
            timer: 800
        })
        await this.setState({branchList:this.props.branch})
    }

  render() {
    return (
        <div style={{marginTop:'200px', marginLeft:'0px', width:'1200px'}}>
            <table>
                <tr>

                    <td>
                        <table>
                            <tr>
                                <td style={{width:'600px',fontSize:'35px', paddingBottom:'30px'}}>Category</td>  
                            </tr>
                            
                            {this.state.categoryList.map((category,index) => {
                                return(
                                    <tr>
                                        <td style={{width:'600px',fontSize:'25px'}}>{(index+=1)+'. '+category.name}</td>
                                    </tr>
                                )
                            })}

                            <tr>
                                <td style={{width:'600px',fontSize:'35px', paddingTop:'30px'}}>Add Category : </td>  
                            </tr>
                            <tr>
                                <td style={{width:'100px',fontSize:'25px'}}>Category Name : </td>  
                                <td ><input 
                                        name='categoryName' 
                                        style={{width:'500px',fontSize:'25px', marginTop:'20px'}}
                                        onChange={this.inputHandler}/>
                                </td>                                  
                            </tr>
                            <tr>
                                <td style={{width:'100px',fontSize:'25px'}}>Image URL : </td>  
                                <td ><input 
                                        name='categoryImage' 
                                        type="textarea" 
                                        style={{width:'500px', height:'80px',fontSize:'25px', marginTop:'20px'}}
                                        onChange={this.inputHandler}/>
                                </td>                                  
                            </tr>
                            <tr>
                                <td style={{left:'50%', paddingTop:'20px'}}>
                                    <button 
                                    style={{width:'200px', height:'50px',fontSize:'20px',borderRadius:'5px'}}
                                    onClick={this.categorySubmit}>
                                        ADD Category
                                    </button> 
                                </td>                                
                            </tr>
                        </table>
                    </td>

                    <td style={{padding:'20px'}}></td>

                    <td>
                        <table style={{paddingBottom:'210px'}}>
                            <tr>
                                <td style={{width:'600px',fontSize:'35px', paddingBottom:'30px'}}>Branch</td>  
                            </tr>
                            
                            {this.state.branchList.map((branch,index) => {
                                return(
                                    <tr>
                                        <td style={{width:'600px',fontSize:'25px'}}>{(index+=1)+'. '+branch.location}</td>
                                    </tr>
                                )
                            })}

                            <tr>
                                <td style={{width:'600px',fontSize:'35px', paddingTop:'30px'}}>Add Branch : </td>  
                            </tr>
                            <tr>
                                <td style={{width:'100px',fontSize:'25px'}}>Location : </td>  
                                <td ><input 
                                        name='branchLocation' 
                                        style={{width:'500px',fontSize:'25px', marginTop:'20px'}}
                                        onChange={this.inputHandler}/></td>                                  
                            </tr>
                           
                            <tr>
                                <td style={{left:'50%', paddingTop:'20px'}}>
                                    <button 
                                    style={{width:'200px', height:'50px',fontSize:'20px',borderRadius:'5px'}}
                                    onClick={this.branchSubmit}>
                                        ADD Branch  
                                    </button> 
                                </td>                                
                            </tr>
                        </table>
                    </td>
                    
                </tr>
            </table>
        </div>
    );
  }
}

function mapStateToProps(state){
    return{
        branch: state.branch.branch,
        categories:state.categories.categories,
    }
}

export default connect(mapStateToProps)(CategoriesBranch);