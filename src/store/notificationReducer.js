import {
    ADD_NOTIFICATION,
    REMOVE_NOTIFICATION
} from "../notification/actions";

const initialState = {
    /**
     * @type {NotificationObject[]}
     */
    notifications: [],
};

export default function notificationReducer(state = initialState, action){
    switch(action.type){
        case ADD_NOTIFICATION:
            return {
                notifications: [action.notification, ...state.notifications]
            };
        case REMOVE_NOTIFICATION:
            return {
                notifications: state.notifications.filter(notification => notification.id !== action.id)
            };
        default:
            return state;
    }
}