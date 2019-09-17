import React from 'react';
import '../style/Wishlist.css';

import { connect } from 'react-redux';
import { getWishlist } from '../public/redux/actions/wishlist';

import Item from '../Components/Item';

class Wishlist extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            wishlist:[],
            id:''
        }
    }

    componentDidMount = async () => {
        const {match: {params}} = this.props;
        await this.setState({id:params.id});

        await this.props.dispatch(getWishlist(this.state.id));
        await this.setState({wishlist:this.props.wishlist})
    }

    render(){
        return(
            <div>
                <h1 className='title'>Wishlist</h1>
                {this.state.wishlist.length !== 0 ?
                    (<div className='content'> 
                        {this.state.wishlist.map(item => 
                        <Item item={item} key={item.id}/>
                        // <p>{item.item}</p>
                        )}
                        
                    </div>)
                    :
                    (<div className='content'> 
                        <h1>Oops, no items in your wishlist yet.</h1>
                    </div>)    
                }
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        wishlist: state.wishlist.wishlist
    }
}

export default connect(mapStateToProps)(Wishlist);