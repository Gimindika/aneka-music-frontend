import React from 'react';
import '../style/Cart.css';

import { connect } from 'react-redux';
import { getCart } from '../public/redux/actions/cart';


class Cart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cart:[],
            id:''
        }
    }

    componentDidMount = async () => {
        const {match: {params}} = this.props;
        await this.setState({id:params.id});

        await this.props.dispatch(getCart(this.state.id));
        await this.setState({cart:this.props.cart})
    }

    render(){
        return(
            <div>
                <h1 className='title'>Cart</h1>
                {this.state.cart.length !== 0 ?
                    (<div className='content'> 
                    <table className='cart-table'>
                        <tbody>
                        <tr>
                            <td>Item</td>
                            <td>Quantity</td>
                        </tr>
                        {this.state.cart.map(item => 
                        <tr key={item.item}>
                             <td>{item.item}</td>
                             <td>{item.quantity}</td>
                        </tr>
                        )}
                        </tbody>
                    </table>
                        
                        
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