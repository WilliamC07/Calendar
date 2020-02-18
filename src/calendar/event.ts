import moment, {Moment} from "moment";

export default class Event{
    id: number;
    title: string;
    description: string;
    category: number;
    isAllDay: boolean;
    start: Moment;
    end: Moment;

    /**
     * @param title {string}
     * @param description {string}
     * @param category {number} Matches an id of a category
     * @param isAllDay {number} If the event is all day. 1 for true. 0 for false
     * @param start {moment.Moment} Starting time
     * @param end {moment.Moment} Ending time
     */
    constructor(title: string, description: string, category: number, isAllDay: boolean | number, start: string | Moment, end: string | Moment){
        this.id = -1; // this will be set when we insert into the sqlite database
        this.title = title;
        this.description = description;
        this.category = category;
        this.isAllDay = !!isAllDay;
        this.start = moment(start);
        this.end = moment(end);
    }

    get startTime(): Moment{
        return moment(this.start);
    }

    get endTime(): Moment{
        return moment(this.end);
    }

}