import React from 'react';
import './App.css';

import Item from './Components/Item';

import { connect } from 'react-redux';
import { getCategories, editCategory } from './public/redux/actions/categories';
import { getItemsByCategory, getItemDetails } from './public/redux/actions/items';
import { login } from './public/redux/actions/user';
import { getCart} from './public/redux/actions/cart';
import { getWishlist } from './public/redux/actions/wishlist';
import { getBranch } from './public/redux/actions/branch';
import { getUserTransactions, getTransactionsByMonth } from './public/redux/actions/transactions';
import Receipt from './Components/Receipt';

class Test extends React.Component{
    state={
      categories:[],
      items: [],
      itemDetails: {},
      user: {},
      token:'',
      wishlist:[],
      cart:[],
      branch: [],
      userTransactions: [],
      transactionsByMonth: [], 
    }

    clik = async () => {
      if(this.state.categories[3].name === "Harp"){
        await this.props.dispatch(editCategory(5, {
          name:"Harpes",
          image:"https://d1aeri3ty3izns.cloudfront.net/media/39/397078/1200/preview.jpg"
        }));
      } else {
        await this.props.dispatch(editCategory(5, {
          name:"Harp",
          image:"https://d1aeri3ty3izns.cloudfront.net/media/39/397078/1200/preview.jpg"
        }));
      }
      await this.setState({categories:this.props.categories})
    }

    componentDidMount = async () => {
        const data = {
          "email":"fandy@yahoo.co.id",
          "password":"santuybro"
        }

        await this.props.dispatch(getCategories());
        await this.props.dispatch(getItemsByCategory(2));
        await this.props.dispatch(getItemDetails(6));
        await this.props.dispatch(login(data));
        await this.props.dispatch(getWishlist(9));
        await this.props.dispatch(getCart(9));
        await this.props.dispatch(getBranch());
        await this.props.dispatch(getUserTransactions(9));
        await this.props.dispatch(getTransactionsByMonth(9));
      
        await this.setState({categories:this.props.categories})
        await this.setState({items:this.props.items})
        await this.setState({itemDetails:this.props.itemDetails})
        await this.setState({user:this.props.user})
        await this.setState({token:this.props.token})
        await this.setState({wishlist:this.props.wishlist})
        await this.setState({cart:this.props.cart})
        await this.setState({branch:this.props.branch})
        await this.setState({userTransactions:this.props.userTransactions})
        await this.setState({transactionsByMonth:this.props.transactionsByMonth})

    }

   
  
    render(){
      return(
          <div>
            <Receipt></Receipt>
              {/* {this.state.categories.map(category => {
                return(
                  <div key={category.id}>
                    <p>{category.id + ' '+category.name}</p>
                  </div>
                )
              })}
              <button onClick={this.clik}>harpers</button>

              {this.state.items.map(item => {
                return(
                  <div key={item.id}>
                    <p>{item.id + ' '+item.name}</p>
                  </div>
                )
              })}

              <div>
                <p>{this.state.itemDetails.id + ' '+this.state.itemDetails.description}</p>
              </div>


              <div>
                <p>{this.state.user.name}</p>
                <p>{this.state.user.email}</p>
                <p>{'level '+this.state.user.level}</p>
                <p>{'token ' + this.state.token}</p>
              </div>

              {this.state.wishlist.map(item => {
                return(
                <div key={item.user}>
                  <p>{'wishlist : ' + item.user + ' ' + item.item}</p>
                </div>
                )
              })}

              {this.state.cart.map(item => {
                return(
                <div key={item.user}>
                  <p>{'cart : ' + item.user + ' ' + item.item + ' ' + item.quantity}</p>
                </div>
                )
              })}
              
              {this.state.branch.map(aBranch => {
                return(
                <div key={aBranch.id}>
                  <p>{'branch : ' + aBranch.id + ' ' + aBranch.location}</p>
                </div>
                )
              })} */}
          </div>
      )
    } 
  }

  function mapStateToProps(state){
    console.log(state);
    
    return{
        categories: state.categories.categories,
        items: state.items.items,
        itemDetails: state.items.itemDetails,
        user: state.user.user,
        token: state.user.token,
        wishlist: state.wishlist.wishlist,
        cart: state.cart.cart,
        branch: state.branch.branch,
        userTransactions: state.transactions.userTransactions,
        transactionsByMonth: state.transactions.transactionsByMonth
    }
}

export default connect(mapStateToProps)(Test);