import React from 'react';
import Item from '../Components/Item';
import { connect } from 'react-redux';
import { getItemsByCategory } from '../public/redux/actions/items';

class ItemList extends React.Component{
    state={
        items: [],
    }

    componentDidMount = async () => {
        const {match: {params}} = this.props;
        await this.props.dispatch(getItemsByCategory(params.id));
        await this.setState({items:this.props.items});
    }

    render(){
        return(
            <div>
            {this.state.items.length !== 0 ?
                (<div className='content'> 
                    {this.state.items.map(item => <Item item={item}/>)}
                </div>)
                :
                (<div className='content'> 
                    <h1>Oops, no items in this category yet.</h1>
                </div>)    
            }
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        items: state.items.items,
    }
}

export default connect(mapStateToProps)(ItemList);