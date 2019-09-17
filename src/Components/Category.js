import React from 'react';
import '../style/Category.css';
// import {Link} from 'react-router-dom';

class Category extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id:props.category.id,
            name: props.category.name,
            image: props.category.image
        }
    }

    render(){
        return(
            // <Link to={`/items/${this.state.id}`}>
                <div className='category-card' onClick={() => this.props.displayItems(this.state.id)}>
                    <p className='category-name'>{this.state.name}</p>
                    <img className='category-img' src={this.state.image} alt='Category'></img>
                </div>
            // </Link>
        )
    }
}

export default Category;