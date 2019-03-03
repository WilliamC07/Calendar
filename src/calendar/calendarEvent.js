import programData from '../data';
const betweenDates = require('./util.js').betweenDates;

/*
    Format of data
    {
        events: []; -- array of all the events
        eventIDTotal: -- the next available eventID for the next event. We are not replacing
    }
 */
const events = programData.getCalendarData('events.json') || {};

/*
    Format of data
    {
        2019: {
                __date__: [1, 2, 3, 4]
              }
    }
 */
const yearDateMatch = {};

// read the previous, current, and next year events
const currentYear = new Date().getFullYear();
yearDateMatch[currentYear-1] = readDataFromDisk(currentYear - 1);
yearDateMatch[currentYear] = readDataFromDisk(currentYear);
yearDateMatch[currentYear+1] = readDataFromDisk(currentYear + 1);

function addEvent(event, dateToAddTo){
    // Create the object attributes since the file containing events does not exist
    if(events.eventIDTotal === undefined){
        events.eventIDTotal = 0;
        events.events = [];
    }
    event.eventID = events.eventIDTotal++;
    events.events.push(event);


    if(yearDateMatch[dateToAddTo.getFullYear()][dateToAddTo] === undefined){
        yearDateMatch[dateToAddTo.getFullYear()][dateToAddTo] = [];
    }
    yearDateMatch[dateToAddTo].push(event.eventID);
}

/**
 * Get
 * @param year Year to be read (do not include .json in the end)
 * @returns {*} Array of all the events for the given year
 */
function readDataFromDisk(year){
    return programData.getCalendarData(`${year}.json`);
}
function saveData(year, data){
    let jsonRepresentation = "[";
    for(let event of data){
        jsonRepresentation += event.JSONString + ",";
    }
    // remove trailing comma
    jsonRepresentation = jsonRepresentation.substring(0, jsonRepresentation.length - 1);
    jsonRepresentation += "]";
    programData.setCalendarData(`${year}.json`, jsonRepresentation);
}

export default {
    readEvents: (date) => {
        const year = date.getFullYear();
        const eventsForDate = [];
        const eventsID = yearDateMatch[year][date] || [];

        if(eventsID.length === 0){
            return [];
        }else{
            // gather all the event objects
            for(let eventID of eventsID){
                eventsForDate.push(events.events[eventID]);
            }
            return eventsForDate;
        }
    },

    addEvent: addEvent,

    removeEvent: (eventID) => {
        delete events.events[eventID]
    },

    saveAll: () => {
        for(let year in events){
            saveData(year, events[year]);
        }
    }
};