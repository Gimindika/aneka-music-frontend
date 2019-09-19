import React from 'react';
import './App.css';

import { BrowserRouter, Route, Switch  } from 'react-router-dom';

import Header from './Components/Header';
import Footer from './Components/Footer';
import ItemDetails from './Pages/ItemDetails';
import ContentList from './Pages/ContentList';
import Wihslist from './Pages/Wishlist';
import Cart from './Pages/Cart';
import Transactions from './Pages/Transactions';
import TransactionsByMonth from './Pages/TransactionsByMonth';
import AddItem from './Pages/AddItem';
import EditItem from './Pages/EditItem';
import CategoriesBranch from './Pages/CategoriesBranch';

function App() {
  return (
    <BrowserRouter>
          <Header />

          <div className='main-container'>
            <div>  
                <Switch>
                  <Route exact path='/' component={ContentList}/>
                  <Route path='/itemDetails/:id' component={ItemDetails}/>
                  <Route path='/wishlist/:id' component={Wihslist}/>
                  <Route path='/cart/:id' component={Cart}/>
                  <Route path='/transaction/:id' component={Transactions}/>
                  <Route path='/transactionbymonth/:month' component={TransactionsByMonth}/>
                  <Route path='/additem' component={AddItem}/>
                  <Route path='/edititem/:id' component={EditItem}/>
                  <Route path='/categoriesbranch' component={CategoriesBranch}/>
                </Switch>
            </div>
          </div>
          
          <Footer />
        </BrowserRouter>
  );
}

export default App;
