import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';

import Reducers from './reducers';

const logger = createLogger();

const store = createStore(Reducers, applyMiddleware(logger, promiseMiddleware));

export default store;