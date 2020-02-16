export class NotificationObject{
    /**
     *
     * @param type {string} What type of notification
     * @param heading {string} Main message of notification.
     * @param {string=} [subMessage=""] Optional sub message
     */
    constructor(type, heading, subMessage = ""){
        if(!type || !heading){
            throw Error("Need type or heading");
        }

        this.type = type;
        this.heading = heading;
        this.id = NotificationObject.idCounter++;
        this.subMessage = subMessage;
    }
}

NotificationObject.idCounter = 0;

export const NotificationType = {
    ERROR: "ERROR",
    SUCCESS: "SUCCESS",
    WARNING: "WARNING"
};
