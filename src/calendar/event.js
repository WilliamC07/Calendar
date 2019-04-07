export default class Event{
    constructor(title, dateStart, dateEnd, timeStart, timeEnd, description) {
        this._title = title;
        this._dateStart = dateStart;
        this._dateEnd = dateEnd;
        this._timeStart = timeStart;
        this._timeEnd = timeEnd;
        this._description = description;
    }
};

function isValidTitle(input){
    return input.trim().length !== 0;
}

export {isValidTitle};