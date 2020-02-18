import {action} from 'typesafe-actions';
import {NotificationTypes} from "./types";
import {Notification} from "../../notification/notification";

export const notify = (notification: Notification) => action(NotificationTypes.ADD_NOTIFICATION, notification);
export const removeNotification = (id: number) => action(NotificationTypes.REMOVE_NOTIFICATION, id);