import React from 'react';
import './App.css';

import { BrowserRouter, Route, Switch  } from 'react-router-dom';

import Header from './Components/Header';
import Footer from './Components/Footer';
// import Categories from './Pages/Categories';
// import ItemList from './Pages/ItemList';
import ItemDetails from './Pages/ItemDetails';
import ContentList from './Pages/ContentList';
import Wihslist from './Pages/Wishlist';
import Cart from './Pages/Cart';
import Transactions from './Pages/Transactions';
import TransactionsByMonth from './Pages/TransactionsByMonth';

function App() {
  return (
    <BrowserRouter>
          <Header />

          <div className='main-container'>
            

            {/* Add button & modal */}
            {/* <AddModal displayCathegory={this.displayCathegory}/> */}

            {/* content */}
            <div>  
                {/* Pages Routes */}
                <Switch>
                  {/* <Route exact path='/' component={Categories}/> */}
                  {/* <Route path='/items/:id' component={ItemList}/> */}
                  <Route exact path='/' component={ContentList}/>
                  {/* <Route path='/items/:id' component={ContentList}/> */}
                  <Route path='/itemDetails/:id' component={ItemDetails}/>
                  <Route path='/wishlist/:id' component={Wihslist}/>
                  <Route path='/cart/:id' component={Cart}/>
                  <Route path='/transaction/:id' component={Transactions}/>
                  <Route path='/transactionbymonth/:month' component={TransactionsByMonth}/>
                  

                </Switch>
            </div>
          </div>{/* main content div */}
          
          <Footer />
        </BrowserRouter>
  );
}

export default App;
