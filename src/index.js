import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import Test from './Test';

import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import store from './public/redux/store';

// ReactDOM.render(<App />, document.getElementById('root'));

const Index = () => {
    return(
        <Provider store={store}>
            <Test />
        </Provider>
    )
}
ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
