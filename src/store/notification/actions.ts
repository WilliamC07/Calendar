import {NotificationTypes} from "./types";
import {Notification} from "../../notification/notification";
import {createAction} from "@reduxjs/toolkit";

export const createNotification = createAction<Notification>(NotificationTypes.ADD_NOTIFICATION);
export const removeNotification = createAction<number>(NotificationTypes.REMOVE_NOTIFICATION);