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
let avaibleEventID = 0;
/**
 * Stores all the date and their eventID pairs.
 * @type {{Date: [int]}}
 */
const dateEventIDs = {};


export {}