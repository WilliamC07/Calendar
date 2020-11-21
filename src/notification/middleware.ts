import {removeNotification} from "../store/notification/actions";
import {NotificationTypes} from "../store/notification/types";
import {Middleware} from "redux";

export const middlewareCloseNotification: Middleware = store => next => action => {
    if(action.type === NotificationTypes.ADD_NOTIFICATION){
        setTimeout(() => {
            store.dispatch(removeNotification(action.payload.id));
        }, 4000);
    }
    return next(action);
};