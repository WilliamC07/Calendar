import programData from '../data';
import {betweenDates} from './util.js'

const events = {};
// read the previous, current, and next year events
const currentYear = new Date().getFullYear();
events[currentYear-1] = readDataFromDisk(currentYear - 1);
events[currentYear] = readDataFromDisk(currentYear);
events[currentYear+1] = readDataFromDisk(currentYear + 1);

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
        if(events[year] === undefined){
            events[year] = readDataFromDisk(year);
        }

        events[year].filter((event) => betweenDates(date, event._dateStart, event._dateEnd)).forEach((event) => eventsForDate.push(event));
        return eventsForDate;
    },

    addEvent: (event) => {
        events[event._dateStart.getFullYear()].append(event);
    },

    saveAll: () => {
        for(let year in events){
            saveData(year, events[year]);
        }
    }
};