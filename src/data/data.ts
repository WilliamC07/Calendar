import {createDirectory, createFile} from "./utility";
const path = window.require('path');

/**
 * Head directory of the program ("~/CalendarJS")
 * @type {string} path to the program directory
 */
const programDirectory = path.join(window.require('os').homedir(), "CalendarJS");
createDirectory(programDirectory);

/**
 * All the subdirectories from the head directory of the program.
 * To add another directory, just follow the format in the object. The directory will be automatically created if it
 * does not exist.
 * @type {{calendarDirectory: string, moneyDirectory: string}}
 */
export const subDirectories = {
    calendarDirectory: path.join(programDirectory, "calendar"),
    moneyDirectory: path.join(programDirectory, "money"),
};
/**
 * Creates:
 * 1. A directory in {@link programDirectory} for each module of this program
 * 2. "data.sqlite3" file in each directory
 */
for(let directory of Object.values(subDirectories)){
    createDirectory(directory);
    createFile(path.join(directory, "data.sqlite3"))
}