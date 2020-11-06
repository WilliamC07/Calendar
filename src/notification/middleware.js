import {removeNotification} from "../store/notification/actions";
import {NotificationTypes} from "../store/notification/types";

export const middlewareCloseNotification = store => next => action => {
    if(action.type === NotificationTypes.ADD_NOTIFICATION){
        setTimeout(() => {
            store.dispatch(removeNotification(action.payload.id));
        }, 4000);
    }
    return next(action);
};