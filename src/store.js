//import {combineReducers} from "redux";
import calendarReducer from './calendar/calendarReducer.js';
import {combineReducers} from "redux";
import {createStore} from 'redux';

//const reducers = combineReducers(calendarReducer);

const store = createStore(combineReducers({
    calendar: calendarReducer,

}));

export default store