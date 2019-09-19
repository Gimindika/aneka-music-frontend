import React from 'react';
import { connect } from 'react-redux';
import {getUserTransactions} from '../public/redux/actions/transactions';

class Transactions extends React.Component{
    state={
        user:{},
        userTransactions:[],
        id:''
    }

    convertTimeStamp = (timeStamp) => {
        timeStamp.toString();
        return(timeStamp.slice(0,10))
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

        await this.props.dispatch(getUserTransactions(this.state.id));
        await this.setState({userTransactions:this.props.userTransactions})
        console.log(this.state);
        
    }

    render(){
         return(
            <div>
                <h1 className='title'>{'Transaction List : ' + this.state.user.name}</h1>
                {this.state.userTransactions.length !== 0 ?
                    (<div className='content'> 
                    <div>
                        <table className='cart-table'>
                            <tbody>
                            {this.state.userTransactions.map((transaction,index) =>   
                                <div style={{marginBottom:'50px'}}>
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
                                                            <td>{item.quantity} unit(s) </td>
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
        userTransactions: state.transactions.userTransactions,
        transactionsByMonth:state.transactions.transactionsByMonth,
    }
}

export default connect(mapStateToProps)(Transactions);