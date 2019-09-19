import React from 'react';
import '../style/ItemDetail.css'
import { connect } from 'react-redux';
import { getItemDetails, deleteItem } from '../public/redux/actions/items';
import { getWishlist, addWishlist, deleteWishlist } from '../public/redux/actions/wishlist';
import { getCart, addCart } from '../public/redux/actions/cart';
import { Link } from 'react-router-dom';

class ItemDetail extends React.Component{
    state={
        user:{},
        itemDetails:{},
        itemstock:[],
        cart:[],
        wishlist:[],
        isWishlisted: false,
        isAddedtoCart: false,
        id:''
    }

    componentDidMount = async () => {
        const {match: {params}} = this.props;
        await this.setState({id:params.id});

        this.setState({
            user:{
                id:localStorage.getItem('userID'),
                name:localStorage.getItem('userName'),
                email:localStorage.getItem('userEmail'),
                level:localStorage.getItem('userLevel'),
            },
            token:localStorage.getItem('token'),
        })

        await this.props.dispatch(getItemDetails(this.state.id));
        await this.setState({itemDetails:this.props.itemDetails})
        await this.setState({itemstock:this.state.itemDetails.itemstock})

        //wishlist//////////////////////////////////////////////////////////
        await this.props.dispatch(getWishlist(this.state.user.id));
        await this.setState({wishlist:this.props.wishlist})

        this.state.wishlist.map(item => {
            if(this.state.id == item.id){ // eslint-disable-line
                this.setState({isWishlisted:true})
            }
            return null;
        })

        //cart///////////////////////////////////////////////////////
        await this.props.dispatch(getCart(this.state.user.id));
        await this.setState({cart:this.props.cart}) 
        
    }

    //wishlist//////////////////////////////////////////////////////
    addRemoveWishlist = async (user, item, command) => {
        if(command == 'add'){ // eslint-disable-line
            await this.props.dispatch(addWishlist(user, item));
            await this.setState({
                wishlist:this.props.wishlist,
                isWishlisted:true
            });
        } else if(command == 'remove') { // eslint-disable-line
            await this.props.dispatch(deleteWishlist(user, item));
            await this.setState({
                wishlist:this.props.wishlist,
                isWishlisted:false
            });
        }
    }

    //cart///////////////////////////////////////////////////////////
    addToCart = async (user, itemID, item, branchID, branch, price, quantity) => {
        await this.state.cart.map( (cartitem) => {
            if(cartitem != undefined){ // eslint-disable-line
                if (item == cartitem.item && branch == cartitem.branch){ // eslint-disable-line
                this.setState({isAddedtoCart:true});
                }
            }  
            return null;      
        })
        
        
        if(!this.state.isAddedtoCart){
            const data = {
                itemID,
                item,
                price,
                branchID,
                branch,
                quantity
            }
            
            await this.props.dispatch(addCart(user,data))
            console.log('ca', user, data);
            await this.setState({
                cart:this.props.cart,
                isAddedtoCart:true
            });
            alert('Item has been added to cart.')
            // window.location.reload();
        } else {
            alert('The item is ready, go to checkout.')
            this.setState({isAddedtoCart:false});
        }
    }

    deleteItem = () => {
        this.props.dispatch(deleteItem(this.state.id));
        alert('Item has been deleted.')
        // this.props.history.push('/');
        window.location.href = '/';
    }

    render(){
         return(
            <div className='content-item-detail'>
                <img className='item-detail-img' src={this.state.itemDetails.image} alt='Item'></img>
                
                <p className='item-detail-name'>{this.state.itemDetails.name}</p>
                <p className='item-detail-category'>Category : {this.state.itemDetails.category}</p>
            
                {/* <EditModal ID={this.state.ID}/> */}
                {this.state.user.level == 2 ? (
                    <div>
                        <button className='delete-button' onClick={this.deleteItem}>Delete </button>
                        <Link to={`/edititem/${this.state.id}`}><button className='edit-button'>Edit </button></Link>
                    </div>
                ):null}
                

                <p className='item-detail-desc'>{this.state.itemDetails.description}</p>

                <p className='available-text'>Available in </p>
                <div className='availability-container'>
                    <ul>
                        {this.state.itemstock.map((stock,index) => 
                        <li className='available-list' key={index}>
                            <div>
                                {stock.branch} : {stock.quantity} unit(s) for Rp. {stock.price} each.
                            </div>
                            <span className='addtocart-span' onClick={() => {this.addToCart(this.state.user.id, this.state.id, this.state.itemDetails.name, stock.branchID, stock.branch, stock.price, 1)}}>Add to cart <img className='addto-cart' alt=''/></span>
                        </li>)}
                    </ul>
                </div>
                
                {this.state.user.level > 0 ? (
                    <div>
                    {this.state.isWishlisted ? 
                        <div>
                            <img className='wishlist-full' onClick={() => this.addRemoveWishlist(this.state.user.id, this.state.id, 'remove')} alt=''/>
                        </div>
                        :
                        <div>
                            <img className='wishlist-empty' onClick={() => this.addRemoveWishlist(this.state.user.id, this.state.id, 'add')} alt=''/>
                        </div>
                    }
                    </div>
                ) :null}
                
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        itemDetails: state.items.itemDetails,
        cart:state.cart.cart,
        wishlist: state.wishlist.wishlist
    }
}

export default connect(mapStateToProps)(ItemDetail);