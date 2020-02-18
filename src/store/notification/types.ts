import {Notification} from "../../notification/notification";

export enum NotificationTypes {
    ADD_NOTIFICATION = "@@notifications/ADD_NOTIFICATION",
    REMOVE_NOTIFICATION = "@@notifications/REMOVE_NOTIFICATION"
}

export interface NotificationState {
    readonly notifications: Notification[]
}