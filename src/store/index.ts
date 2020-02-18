import {CalendarState} from "./calendar/types";
import {combineReducers} from "redux";
import {calendarReducer} from "./calendar/reducer";
import {NotificationState} from "./notification/types";
import {notificationReducer} from "./notification/reducer";


export interface ApplicationState {
    calendar: CalendarState,
    notification: NotificationState
}

export const rootReducer = combineReducers({
    calendar: calendarReducer,
    notification: notificationReducer
});