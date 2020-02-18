import React, {useState} from 'react';
import {connect} from 'react-redux';
import "./style.scss";
import {Notification} from "../notification";
import {ApplicationState} from "../../store";

interface PropsFromState {
    notifications: Notification[]
}

const NotificationContainer: React.FC<PropsFromState> = ({notifications}) => {
    return (
        <div className="notification-container">
            {notifications.map((notification) =>
                <div className="notification" data-notification-type={notification.type} key={`notification ${notification.id}`}>
                    {notification.heading}
                </div>)}
        </div>
    )
};

function mapStateToProps({notification}: ApplicationState){
    return {
        notifications: notification.notifications
    }
}

export default connect(mapStateToProps)(NotificationContainer);