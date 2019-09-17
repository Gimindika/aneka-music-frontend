import React from 'react';
import '../style/ItemDetail.css'
import { connect } from 'react-redux';
import { getItemDetails } from '../public/redux/actions/items';

class ItemDetail extends React.Component{
    state={
        itemDetails:{},
        itemstock:[],
        id:''
    }

    componentDidMount = async () => {
        const {match: {params}} = this.props;
        await this.setState({id:params.id});

        await this.props.dispatch(getItemDetails(this.state.id));
        await this.setState({itemDetails:this.props.itemDetails})
        await this.setState({itemstock:this.state.itemDetails.itemstock})
    }

    render(){
         return(
            <div className='content-item-detail'>
                <img className='item-detail-img' src={this.state.itemDetails.image} alt='Item'></img>
                
                <p className='item-detail-name'>{this.state.itemDetails.name}</p>
                <p className='item-detail-category'>Category : {this.state.itemDetails.category}</p>
            
                {/* <EditModal ID={this.state.ID}/> */}
                
                <button className='delete-button'>Delete</button>

                <p className='item-detail-desc'>{this.state.itemDetails.description}</p>

                <p className='available-text'>Available in </p>
                <div className='availability-container'>
                    <ul>
                        {this.state.itemstock.map((stock,index) => 
                        <li className='available-list' key={index}>
                            {stock.branch} : {stock.quantity} unit(s) for Rp. {stock.price} each
                        </li>)}
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    console.log(state.user);
    
    return{
        itemDetails: state.items.itemDetails,
    }
}

export default connect(mapStateToProps)(ItemDetail);