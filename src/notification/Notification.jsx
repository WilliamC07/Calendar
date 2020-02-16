import React, {useState} from 'react';
import * as actions from "./actions";
import {connect} from 'react-redux';
import "./style.scss";

function NotificationConnect({notifications}){
    return (
        <div className="notification-container">
            {notifications.map((notification) =>
                <div className="notification" data-notification-type={notification.type} key={`notification ${notification.id}`}>
                    {notification.heading}
                </div>)}
        </div>
    )

}

function mapStateToProps(store){
    return {
        /**
         * @type {NotificationObject[]}
         */
        notifications: store.notification.notifications
    }
}

const Notification = connect(mapStateToProps)(NotificationConnect);
export default Notification;