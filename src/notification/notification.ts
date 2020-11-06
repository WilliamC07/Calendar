export class Notification{
    private static idCounter: number = 0;
    type: NotificationType;
    heading: string;
    subMessage: string;
    id: number;

    constructor(type: NotificationType, heading: string, subMessage: string = ""){
        if(!type || !heading){
            throw Error("Need type or heading");
        }

        this.type = type;
        this.heading = heading;
        this.id = Notification.idCounter++;
        this.subMessage = subMessage;
    }

    toString(){
        return `notification${this.id}`;
    }
}

export enum NotificationType {
    ERROR = "ERROR",
    SUCCESS = "SUCCESS",
    WARNING = "WARNING"
}
