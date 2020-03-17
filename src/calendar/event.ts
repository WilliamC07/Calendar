import moment, {Moment} from "moment";

export default class Event{
    /**
     * This value should be set when you insert into the database. Should be unique.
     */
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
     * @param isAllDay {boolean} If the event is all day.
     * @param start {moment.Moment} Starting time
     * @param end {moment.Moment} Ending time
     */
    constructor(title: string, description: string, category: number, isAllDay: boolean, start: Moment, end: Moment){
        Event.validate(title, category, start, end);

        this.id = -1; // this will be set when we insert into the sqlite database
        this.title = title;
        this.description = description;
        this.category = category;
        this.isAllDay = isAllDay;
        Object.freeze(start);
        Object.freeze(end);
        this.start = start;
        this.end = end;
    }

    static validate(title: string, category: number, start: Moment, end: Moment){
        if(title.trim().length === 0){
            throw new Error("New event requires a title!");
        }else if(end.isBefore(start)){
            throw new Error("End date must be after start date!");
        }else if(category === 0){
            throw new Error("No category chosen for the event");
        }
    }

    /**
     * Used to sort an array of events.
     * @param e1
     * @param e2
     */
    static sortEvents(e1: Event, e2: Event): number{
        if(e1.isAllDay && !e2.isAllDay){
            return -1;
        }else if(e1.isAllDay && e2.isAllDay){
            return e1.title.localeCompare(e2.title);
        }else if(e1.start.isSame(e2.start)){
            // same starting time, so compare id for continuity of previous day event list
            return e1.id - e2.id;
        }else{
            // different starting time, so list earlier one first
            return e1.start.isAfter(e2.start) ? -1 : 1;
        }
    }
}