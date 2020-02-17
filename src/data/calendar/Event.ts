import moment, {Moment} from "moment";

export default class Event{
    id: number;
    title: string;
    description: string;
    category: number;
    isAllDay: boolean;
    start: string;
    end: string;

    /**
     * @param title {string}
     * @param description {string}
     * @param category {number} Matches an id of a category
     * @param isAllDay {boolean} If the event is all day
     * @param start {string} ISOString of the starting time
     * @param end {string} ISOString of the ending time
     */
    constructor(title: string, description: string, category: number, isAllDay: boolean, start: string, end: string){
        this.id = -1; // this will be set when we insert into the sqlite database
        this.title = title;
        this.description = description;
        this.category = category;
        this.isAllDay = isAllDay;
        this.start = start;
        this.end = end;
    }

    get startTime(): Moment{
        return moment(this.start);
    }

    get endTime(): Moment{
        return moment(this.end);
    }

}