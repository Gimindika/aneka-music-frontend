import React from 'react';
import './App.css';

import Item from './Components/Item';

import { connect } from 'react-redux';
import { getCategories, editCategory } from './public/redux/actions/categories';
import { getItemsByCategory, getItemDetails } from './public/redux/actions/items';

class Test extends React.Component{
    state={
      categories:[],
      items: [],
      itemDetails: {}
    }

    clik = async () => {
      if(this.state.categories[3].name === "Harp"){
        await this.props.dispatch(editCategory(5, {
          name:"Harpes",
          image:"https://d1aeri3ty3izns.cloudfront.net/media/39/397078/1200/preview.jpg"
        }));
      } else {
        await this.props.dispatch(editCategory(5, {
          name:"Harp",
          image:"https://d1aeri3ty3izns.cloudfront.net/media/39/397078/1200/preview.jpg"
        }));
      }
      await this.setState({categories:this.props.categories})
    }

    componentDidMount = async () => {
        await this.props.dispatch(getCategories());
        await this.props.dispatch(getItemsByCategory(2));
        await this.props.dispatch(getItemDetails(6));
      
        await this.setState({categories:this.props.categories})
        await this.setState({items:this.props.items})
        await this.setState({itemDetails:this.props.itemDetails})

        
    }

   
  
    render(){
      return(
          <div>
              {this.state.categories.map(category => {
                return(
                  <div key={category.id}>
                    <p>{category.id + ' '+category.name}</p>
                  </div>
                )
              })}
              <button onClick={this.clik}>harpers</button>

              {this.state.items.map(item => {
                return(
                  <div key={item.id}>
                    <p>{item.id + ' '+item.name}</p>
                  </div>
                )
              })}

              <div>
                <p>{this.state.itemDetails.id + ' '+this.state.itemDetails.description}</p>
              </div>

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
          </div>
      )
    } 
  }

  function mapStateToProps(state){
    console.log(state);
    
    return{
        categories: state.categories.categories,
        items: state.items.items,
        itemDetails: state.items.itemDetails
    }
}

export default connect(mapStateToProps)(Test);