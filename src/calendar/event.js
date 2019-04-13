import {daysUntil} from "./util";

export default class Event{
    constructor(title, dateStart, dateEnd, timeStart, timeEnd, description) {
        this._title = title;
        this._dateStart = dateStart;
        this._dateEnd = dateEnd;
        // swap if start is after the end
        if(dateStart.getTime() > dateEnd.getTime()){
            [this._dateStart, this._dateEnd] = [this._dateEnd, this._dateStart];
        }

        this._timeStart = timeStart;
        this._timeEnd = timeEnd;
        this._description = description;
        this._length = daysUntil(this._dateStart, this._dateEnd);
        // used for setting position on the calendar grid
        this.position = -1;
    }
};

function isValidTitle(input){
    return input.trim().length !== 0;
}

export {isValidTitle};