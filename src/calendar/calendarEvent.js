const programData = require("../data.js");
const Event = require('./event.js');
const fs = require('fs');
const path = require('path');

/*
    Stores all the events for the previous year, current year, and next year.
 */
const yearsToRead = () => {
    let currentYear = new Date().getFullYear();
    return [currentYear - 1, currentYear, currentYear + 1];
};

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
