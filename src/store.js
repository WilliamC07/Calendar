//import {combineReducers} from "redux";
import calendarReducer from './calendar/calendarReducer.js';
import {createStore} from 'redux';

//const reducers = combineReducers(calendarReducer);

const store = createStore(calendarReducer);

export default store