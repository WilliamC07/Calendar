import {action} from 'typesafe-actions';
import {NotificationTypes} from "./types";
import {NotificationObject} from "../../notification/NotificationObject";

export const notify = (notification: NotificationObject) => action(NotificationTypes.ADD_NOTIFICATION, notification);
export const removeNotification = (id: number) => action(NotificationTypes.REMOVE_NOTIFICATION, id);