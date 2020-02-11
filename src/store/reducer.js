import {combineReducers} from 'redux';
import calendarReducer from "./calendarReducer";
import notificationReducer from "./notificationReducer";

const rootReducer = combineReducers({
    calendar: calendarReducer,
    notification: notificationReducer,
});

export default rootReducer;