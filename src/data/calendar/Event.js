import moment from 'moment';

export default class Event{
    /**
     *
     * @param title {string}
     * @param description {string}
     * @param category {number} Matches an id of a category
     * @param isAllDay {boolean} If the event is all day
     * @param start {string} ISOString of the starting time
     * @param end {string} ISOString of the ending time
     */
    constructor(title, description, category, isAllDay, start, end){
        this.id = -1; // this will be set when we insert into the sqlite database
        this.title = title;
        this.description = description;
        this.category = category;
        this.isAllDay = isAllDay;
        this.start = start;
        this.end = end;
    }

    get startTime(){
        return moment(this.start);
    }

    get endTime(){
        return moment(this.end);
    }

}