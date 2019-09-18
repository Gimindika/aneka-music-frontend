import React from 'react';
import { connect } from 'react-redux';
import {getTransactionsByMonth} from '../public/redux/actions/transactions';

class TransactionsByMonth extends React.Component{
    state={
        user:{},
        transactionsByMonth:[],
        month:''
    }

    convertTimeStamp = (timeStamp) => {
        timeStamp.toString();
        return(timeStamp.slice(0,10))
    }

    componentDidMount = async () => {
        const {match: {params}} = this.props;
        await this.setState({month:params.month});

        this.setState({
            user:{
                id:localStorage.getItem('userID'),
                name:localStorage.getItem('userName'),
                email:localStorage.getItem('userEmail'),
                level:localStorage.getItem('userLevel'),
            },
            token:localStorage.getItem('token'),
        })

        await this.props.dispatch(getTransactionsByMonth(this.state.month));
        await this.setState({transactionsByMonth:this.props.transactionsByMonth})
    }

    render(){
         return(
            <div>
                <h1 className='title'>{'Transaction List : ' + this.state.user.name}</h1>
                {this.state.transactionsByMonth.length !== 0 ?
                    (<div className='content'> 
                    <div>
                        <table className='cart-table'>
                            <tbody>
                            {this.state.transactionsByMonth.map((transaction,index) =>   
                                <div>
                                <tr key={index}>
                                    <td>{this.convertTimeStamp(transaction.date)}</td>
                                </tr>
                                    
                                    <tr>
                                        {transaction.transactionitems.map((item, index) => {
                                            return(
                                                <div key={index}>
                                                
                                                        <td>{item.name}</td>
                                                        <td className='branch-label'>({item.branch})</td>
                                                        <tr>
                                                            <td>{item.quantity}</td>
                                                            <td>Rp. {item.price}</td>
                                                        </tr>
                                                </div>
                                            )   
                                        })}
                                    </tr>

                                    <tr>
                                        <td>Total : Rp.{Object.values(transaction.transactionitems).reduce((total, {price}) => total + price, 0)}</td>
                                    </tr>

                                </div>
                            )}
                                
                            </tbody>
                        </table>
                    </div>
                    

                        
                    </div>)
                    :
                    (<div className='content'> 
                        <h1>Oops, go buy something first.</h1>
                    </div>)    
                }
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        transactionsByMonth:state.transactions.transactionsByMonth,
    }
}

export default connect(mapStateToProps)(TransactionsByMonth);