import {onlyDateAspect} from './util';

/**
 * Event id: event
 *
 * {
 *      1: event,
 *      2: event
 * }
 */
const eventsIDToDates = { };

let nextEventID = 0;

/**
 * Date object: event ids
 *
 * {
 *     Nov 2 2018: [1],
 *     Nov 3 2018: [1, 2],
 * }
 */
const datesToEventsID = { };

export default {
    addEvent(event, date){
        event._eventID = nextEventID;
        eventsIDToDates[nextEventID] = event;

        // Make sure we are only looking at the month, day of month, and year part
        date = onlyDateAspect(date);

        if(datesToEventsID[date] === undefined){
            datesToEventsID[date] = [nextEventID];
        }else{
            datesToEventsID[date].push(nextEventID);
        }

        nextEventID++;
    },

    getEvent(date){
        return datesToEventsID[date].reduce((accumulator, current) => accumulator.push(eventsIDToDates[current]));
    }
}