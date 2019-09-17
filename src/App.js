import React from 'react';
import './App.css';

import { BrowserRouter, Route, Switch  } from 'react-router-dom';

import Header from './Components/Header';
import Footer from './Components/Footer';


function App() {
  return (
    <BrowserRouter>
          <Header />

          <div className='main-container'>
            {/* search bar */}
            <div className='search-container'>
              <img className='search-logo' alt=''></img>
              <input 
                className='search-bar' 
                placeholder='Search' 
                >
              </input>

            </div>
            {/* setting button */}
            <div className='setting-button-container'>
              <img className='setting-button-logo' alt=''></img>
            </div>

            {/* Add button & modal */}
            {/* <AddModal displayCathegory={this.displayCathegory}/> */}

            {/* content */}
            <div>
                {/* Pages Routes */}
                {/* <Switch>
                  <Route exact path='/' component={Categories}/>
                  <Route path='/items/:CategoryID' component={ItemList}/>
                  <Route path='/itemDetail2/:ItemID' component={ItemDetail2}/>
                  <Route path='/itemName/:ItemName' component={SearchItem}/>
                </Switch> */}
          
            </div>
          </div>{/* main content div */}
          
          <Footer />
        </BrowserRouter>
  );
}

export default App;
