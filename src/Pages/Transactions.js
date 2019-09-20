import React from 'react';
import { connect } from 'react-redux';
import {getUserTransactions} from '../public/redux/actions/transactions';

class Transactions extends React.Component{
    state={
        user:{},
        token:'',
        header:'',

        userTransactions:[],
        id:''
    }

    convertTimeStamp = (timeStamp) => {
        timeStamp.toString();
        return(timeStamp.slice(0,10))
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

        const {match: {params}} = this.props;
        await this.setState({id:params.id});

        await this.props.dispatch(getUserTransactions(this.state.id, this.state.header));
        await this.setState({userTransactions:this.props.userTransactions})
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
                                                        <td>{item.itemName}</td>
                                                        <td className='branch-label'>({item.location})</td>
                                                        <tr>
                                                            <td>{item.quantity} unit(s) </td>
                                                            <td>Rp. {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                        </tr>
                                                </div>
                                            )   
                                        })}
                                    </tr>

                                    <tr>
                                        <td>Total : Rp.{Object.values(transaction.transactionitems).reduce((total, {price}) => total + price, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
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