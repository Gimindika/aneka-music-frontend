import React from "react";
import '../style/Cart.css'

class Receipt extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            transaction:this.props.transaction
        }
    }
   
  render() {
  return(
    <div className='receipt-container' >
        <table className='cart-table'>
    <tr>
        <td style={{fontSize:'40px'}}>Aneka Music</td>
    </tr>
    <tr>
        <td>Receipt : {Date(Date.now()).toString().slice(4,15)}</td>
    </tr>
        
        <tr>
            {this.state.transaction.map((item, index) => {
                return(
                    <div key={index}>
                    
                            <td>{item.item}</td>
                            <td className='branch-label'>({item.branch})</td>
                            <tr>
                                <td>{item.quantity} unit(s) </td>
                                <td>Rp. {item.price}</td>
                            </tr>
                    </div>
                )   
            })}
        </tr>

        <tr>
            <td className='totalprice'>Total : Rp.{Object.values(this.state.transaction).reduce((total, {price}) => total + price, 0)}</td>
        </tr>
        </table>
    </div>
  );
 }


  
}
 
export default Receipt;