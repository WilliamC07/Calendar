import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {calendarReducer} from "./calendar/reducer";
import {notificationReducer} from "./notification/reducer";
import {middlewareCloseNotification} from "../notification/middleware";

const rootReducer = combineReducers({
    calendar: calendarReducer,
    notification: notificationReducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: [middlewareCloseNotification]
});

// for debugging purposes
// @ts-ignore
window.store = store;

export type RootState = ReturnType<typeof rootReducer>;
export type Dispatch = typeof store.dispatch;