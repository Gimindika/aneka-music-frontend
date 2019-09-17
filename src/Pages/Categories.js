import React from 'react';
import Category from '../Components/Category';
import { connect } from 'react-redux';
import { getCategories } from '../public/redux/actions/categories';

class Categories extends React.Component{
    state={
        categories:[],
    }

    componentDidMount = async () => {
        await this.props.dispatch(getCategories());

        await this.setState({categories:this.props.categories})
    }

    render(){
        
        return(
            <div className='content'> 
                {this.state.categories.map(category => <Category category={category}/>)}
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        categories: state.categories.categories,
    }
}

export default connect(mapStateToProps)(Categories);