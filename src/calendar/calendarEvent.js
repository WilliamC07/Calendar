import {equalDates, getDateMonthYearAspect} from './util.js';

/**
 * Store all the events. This is guaranteed to be in order.
 * @type {Array} Array of all the events in order by its eventID
 */
const events = [];
/**
 * This number is available for the next eventID.
 * @type {number}
 */
let availableID = 0;
/**
 * Stores all the date and their eventID pairs. The date key should only have the year and month and month value.
 * Everything else (hour, minute, second, millisecond) should be 0.
 * @type {{Date: [int]}}
 */
const dateEventIDs = {};

/* Functions to use */
/**
 * Add the event.
 * @param event Event to add.
 */
function addEvent(event){
    event.eventID = availableID++;

    // Add the dateEventIDs pair
    let startDate = new Date(event._dateStart);
    while(equalDates(startDate, event._dateEnd)){
        if(dateEventIDs[startDate] === undefined){
            dateEventIDs[startDate] = [event.eventID];
        }else{
            dateEventIDs[startDate].push(event.eventID);
        }
        startDate.setDate(startDate.getDate() + 1);
    }

    events.push(event);
}

export {}