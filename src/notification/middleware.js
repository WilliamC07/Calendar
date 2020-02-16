import * as actions from "./actions";

export const middlewareCloseNotification = store => next => action => {
    if(action.type === actions.ADD_NOTIFICATION){
        console.log("added timeout for ", action.notification);
        setTimeout(() => {
            store.dispatch(actions.removeNotification(action.notification.id));
            console.log("removed for ", action.notification.id);
        }, 4000);
    }
    return next(action);
};