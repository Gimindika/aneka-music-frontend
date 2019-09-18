import React from 'react';
import Category from '../Components/Category';
import Item from '../Components/Item';
import { connect } from 'react-redux';
import { getCategories, setDisplay } from '../public/redux/actions/categories';
import { getItemsByCategory, getItemsByName } from '../public/redux/actions/items';
import '../style/ContentList.css';
import { Link } from 'react-router-dom'

class ContentList extends React.Component{
    state={
        categories:[],
        items: [],
        displayCategories:'',
        search: '',
        user:{},
        token:''
    }

    componentDidMount = async () => {
        await this.props.dispatch(getCategories());
        await this.setState({
            categories:this.props.categories,
            displayCategories: this.props.displayCategories
        })
        this.setState({
            user:{
                id:localStorage.getItem('userID'),
                name:localStorage.getItem('userName'),
                email:localStorage.getItem('userEmail'),
                level:localStorage.getItem('userLevel'),
            },
            token:localStorage.getItem('token'),
        })
     
    }

    displayItems = async (id) => {
        await this.props.dispatch(getItemsByCategory(id));
        await this.props.dispatch(setDisplay(false))
        await this.setState({
            items:this.props.items,
            displayCategories: this.props.displayCategories
        });
    }

    search = async (event) => {                 // eslint-disable-next-line
        if(event.target.value != ''){
            await this.setState({[event.target.name]:[event.target.value]})
            await this.props.dispatch(getItemsByName(this.state.search));
            await this.props.dispatch(setDisplay(false))
        
            await this.setState({
            items:this.props.items,
            displayCategories: this.props.displayCategories
            });
        } else {
            await this.props.dispatch(setDisplay(true));
            await this.setState({displayCategories: this.props.displayCategories})
        }
    }

    render(){
        return(
            <div>
                {/* search bar */}
                <div className='search-container'>
                <img className='search-logo' alt=''></img>
                <input 
                    name='search'
                    className='search-bar' 
                    placeholder='Search'
                    onChange = {this.search} 
                    >
                </input>

                </div>
                {/* setting button */}
                <div className='setting-button-container'>
                <img className='setting-button-logo' alt=''></img>
                </div>

                {this.state.displayCategories ? (
                    <div className='content'> 
                        {this.state.categories.map(category => <Category displayItems={this.displayItems} category={category} key={category.id}/>)}
                    </div>
                    ): 
                    <div>
                        {this.state.items.length !== 0 ?
                            (<div className='content'> 
                                {this.state.items.map(item => <Item item={item} key={item.id}/>)}
                            </div>)
                            :
                            (<div className='content'> 
                                <h1>Oops, no items in this category yet.</h1>
                            </div>)    
                        }
                    </div>
                }

                {this.state.user.level != undefined || 0 ? ( // eslint-disable-line
                    <div className='button-container'>
                        <Link to={`/transaction/${this.state.user.id}`}><button className='categorybranch-button'>Transaction List</button></Link>

                        {this.state.user.level == 2 ? ( // eslint-disable-line
                        <div>
                            <button className='additem-button'>Add Item</button> 
                            <button className='categorybranch-button'>Category & Branch</button>

                            <p className='transactions-month'> Transactions By Month</p>
                            <Link to={`/transactionbymonth/1`}><button className='additem-button' id={1}>Jan</button></Link>
                            <button className='additem-button' id={2}>Feb</button>
                            <button className='additem-button' id={3}>Mar</button>
                            <button className='additem-button' id={4}>Apr</button>
                            <button className='additem-button' id={5}>May</button>
                            <button className='additem-button' id={6}>Jun</button>
                            <button className='additem-button' id={7}>Jul</button>
                            <button className='additem-button' id={8}>Aug</button>
                            <Link to={`/transactionbymonth/9`}><button className='additem-button' id={9}>Sep</button></Link>
                            <button className='additem-button' id={10}>Oct</button>
                            <button className='additem-button' id={11}>Nov</button>
                            <button className='additem-button' id={12}>Dec</button>
                        </div>
                        )
                        :null}
                    </div>
                )
                :null}
           </div> 
        )
    }
}

function mapStateToProps(state){
    return{
        categories: state.categories.categories,
        displayCategories: state.categories.displayCategories,
        items: state.items.items,
    }
}

export default connect(mapStateToProps)(ContentList);