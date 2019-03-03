class Event{
    /**
     * Creates an instance of this class.
     * @param position Position on the calendar
     * @param title Title of the event.
     * @param dateStart Date the event starts (only need month, day, and year)
     * @param dateEnd Date the event ends (only need month, day, and year). If undefined, it is assumed to be the starting date.
     * @param timeStart Time the event starts (date object). Optional.
     * @param timeEnd Time the event ends (date object). Optional.
     * @param description Description of the event. Optional.
     * @param tags
     * @param color
     */
    constructor(position, title, dateStart, dateEnd, timeStart, timeEnd, description, tags, color) {

        this._position = position;
        this._title = title;
        this.processDate(dateStart);
        this._dateStart = dateStart;
        if(dateEnd === undefined){
            this._dateEnd = dateStart;
        }else{
            this.processDate(dateEnd);
            this._dateEnd = dateEnd;
        }
        this._timeStart = timeStart;
        this._timeEnd = timeEnd;
        this._description = description === undefined ? "" : description;
        this._dateEnd = dateEnd;
        this._description = description;
        this._tags = tags;
        this._color = color;
    };

    /**
     * Only process the month, year, and day of month part of the object. Sets the hour, minute, second, and millisecond
     * to 0. Modifies the object directly.
     * @param date Date to remove time aspect of it.
     */
    processDate(date){
        date.setHours(0, 0, 0, 0);
    };

    get title() {
        return this._title;
    };

    /**
     * @param value Must not be an empty string.
     */
    set title(value) {
        if(value.trim().length !== 0){
            this._title = value;
        }
    };

    get dateStart() {
        return this._dateStart;
    };

    set dateStart(value) {
        this.processDate(value);
        // If the starting date is after the end date, they will be swapped
        if(value.getTime() > this._dateEnd){
            [this._dateStart, this._dateEnd] = [this._dateEnd, this._dateStart];
        }
        this._dateStart = value;
    };

    get dateEnd() {
        return this._dateEnd;
    };

    set dateEnd(value) {
        this.processDate(value);
        // If the starting date is after the end date, they will be swapped
        if(value.getTime() > this._dateEnd){
            [this._dateStart, this._dateEnd] = [this._dateEnd, this._dateStart];
        }
        this._dateEnd = value;
    };

    get timeStart() {
        return this._timeStart;
    };

    set timeStart(value) {
        this._timeStart = value;
    };

    get timeEnd() {
        return this._timeEnd;
    };

    set timeEnd(value) {
        this._timeEnd = value;
    };

    get description() {
        return this._description;
    };

    set description(value) {
        this._description = value;
    };

    get JSONString(){
        return JSON.stringify(this, (key, value) => {
            // don't save #position
            if(key === '_position') return undefined;
            return value;
        })
    }
}
export default Event;