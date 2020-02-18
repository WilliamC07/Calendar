import {Reducer} from "redux";
import {NotificationTypes, NotificationState} from "./types";

const initialState: NotificationState = {
    notifications: []
};

export const notificationReducer: Reducer<NotificationState> = (state: NotificationState = initialState, action) => {
    switch(action.type){
        case NotificationTypes.REMOVE_NOTIFICATION:
            return {
                notifications: state.notifications.filter(notification => notification.id !== action.payload)
            };
        case NotificationTypes.ADD_NOTIFICATION:
            return {
                notifications: [action.payload, ...state.notifications]
            };
        default:
            return state;
    }
};