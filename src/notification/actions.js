export const ADD_NOTIFICATION = "ADD_NOTIFICATION";

/**
 *
 * @param notification {NotificationObject} Notification Object
 * @returns {{notification: *, type: *}}
 */
export function notify(notification){
    return {
        type: ADD_NOTIFICATION,
        notification
    }
}
export const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";
export function removeNotification(id){
    return {
        type: REMOVE_NOTIFICATION,
        id
    }
}
