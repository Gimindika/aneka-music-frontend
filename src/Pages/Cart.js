import React from 'react';
import '../style/Cart.css';

import { connect } from 'react-redux';
import { getCart, editCart, deleteCart } from '../public/redux/actions/cart';
import { newTransaction } from '../public/redux/actions/transactions';

import Receipt from '../Components/Receipt';
import ReactToPrint from 'react-to-print';


class Cart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cart:[],
            user:{},
            total:0,

            receipt:false
        }
    }

    componentDidMount = async () => {
        const {match: {params}} = this.props;
        await this.setState({id:params.id});

        await this.props.dispatch(getCart(this.state.id));
        await this.setState({cart:this.props.cart})

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

    editQuantity = async (user, item, branch, quantity) => {
        const data = {
            item,
            branch,
            quantity
        }
        if(quantity > 0){
            await this.props.dispatch(editCart(user, data));
            await this.setState({cart:this.props.cart});
        } else {
            await this.props.dispatch(deleteCart(user, item, branch));
            await this.setState({cart:this.props.cart});
           
        }
    }

    //count total price/////////////////////////////////////////////////
    total = () => {
        let tot = 0;
        this.state.cart.map(item => { // eslint-disable-line
            tot += (item.quantity * item.price)
        })
      
        return tot
    }

    handleCheckout = () => {
        const tmp = [];
        this.state.cart.map(cartitem => {
            tmp.push({
                item:cartitem.itemID,
                branch:cartitem.branchID,
                quantity:cartitem.quantity,
                price:(cartitem.price * cartitem.quantity)
            })
            return null;
        })
        const data = {
            transactionitems: [...tmp]
        }

        this.props.dispatch(newTransaction(this.state.user.id, data));
        alert('transaction success')
        this.setState({receipt:true})
    }

    render(){
        return(
            <div>
                <h1 className='title'>Cart</h1>
                {this.state.cart.length !== 0 ?
                    (<div className='content'> 
                    <div>
                        <table className='cart-table'>
                            <tbody>
                            {this.state.cart.map((item,index) =>   
                             
                                <tr key={index}>
                                <td>
                                    <div className='itembranch'>
                                        <div>{item.item}</div>    
                                        <div className='branch-label'>{item.branch}</div>
                                        <div className='price'>RP. {item.price}</div>
                                    </div>
                                </td>
                                <td><img className='minus-button' alt='' 
                                onClick={() => {this.editQuantity(this.state.user.id, item.itemID, item.branchID, item.quantity-=1)}}/></td>
                                <td className='quantity'>{item.quantity}</td>
                                <td><img className='plus-button' alt=''
                                onClick={() => {this.editQuantity(this.state.user.id, item.itemID, item.branchID, item.quantity+=1)}}/></td>
                                <td className='pricequantity'>Rp. {item.price * item.quantity}</td>
                                </tr>
                            )}
                                <tr>
                                    <td> Total : </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>

                                    <td>Rp. {this.total()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    

                    <div className='checkoutbutton-container'>
                        <button className='checkout-button' onClick={() => this.handleCheckout()}>Checkout</button>
                        {this.state.receipt ? (
                        <ReactToPrint
                            trigger={() => <button className='printreceipt-button'>Print</button>}
                            content={() => this.componentRef}
                        />
                        ) :null}
                    </div>

                    
                    
                    {this.state.receipt ? (
                        <div>
                            <Receipt transaction={this.state.cart} ref={el => (this.componentRef = el)}></Receipt>
                        </div>
                    ) :null}
                        
                    </div>)
                    :
                    (<div className='content'> 
                        <h1>Oops, no items in your cart yet.</h1>
                    </div>)    
                }
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        cart: state.cart.cart
    }
}

export default connect(mapStateToProps)(Cart);