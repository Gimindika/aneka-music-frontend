import {combineReducers} from 'redux';

import categories from './categories';
import branch from './branch';
import wishlist from './wishlist';
import cart from './cart';
import transactions from './transactions';
import items from './items';

const Reducers = combineReducers({
    categories,
    branch,
    wishlist,
    cart,
    transactions,
    items    
})

export default Reducers;