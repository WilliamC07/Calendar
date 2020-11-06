import {createReducer} from "@reduxjs/toolkit";
import {Notification} from "../../notification/notification";
import {createNotification, removeNotification} from "./actions";

export const notificationReducer = createReducer([] as Notification[], (builder) => {
    builder
        .addCase(createNotification, (state, action) => {
            return [...state, action.payload];
        })
        .addCase(removeNotification, (state, action) => {
            return state.filter(notification => notification.id !== action.payload);
        });
});
