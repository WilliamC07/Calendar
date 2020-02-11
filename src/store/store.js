import {createStore, applyMiddleware} from 'redux';
import {middlewareCloseNotification} from "../notification/middleware";
import rootReducer from './reducer';

const store = createStore(rootReducer, applyMiddleware(
    middlewareCloseNotification
));

window.store = store;

export default store;