/*
 * This file should be used to gain data that was stored on disk.
 */
const path = require('path');
const fs = window.require('fs');

function getProgramDirectory(){
    const programDirectoryPath = path.join("/Users/williamcao/Library", "Application Support", "CalendarJS");
    createDirectoryIfMissing(programDirectoryPath);
    return programDirectoryPath;
}

function getCalendarDirectory(programDirectory){
    const calendarPath = path.join(programDirectory, 'Calendar');
    createDirectoryIfMissing(calendarPath);
    return calendarPath;
}

/**
 * Makes a directory for the given path if one does not exist. If one does exist, nothing will happen.
 * @param directoryPath Path to the directory that may or may not exist
 */
function createDirectoryIfMissing(directoryPath){
    // Sync because we need a place to store data
    if(!fs.existsSync(directoryPath)){
        fs.mkdirSync(directoryPath);
    }
}

function readFile(filePath, parser) {
    if (!fs.existsSync(filePath)) {
        // create the file if one doesn't exists
        fs.writeFileSync(filePath, "{}");
        return null;
    } else {
        console.log(fs.readFileSync(filePath, 'utf8'));
        return JSON.parse(fs.readFileSync(filePath, 'utf8'), parser);
    }
}

function writeFile(filePath, jsonString){
    fs.writeFileSync(filePath, jsonString);
}

function readConfig(){
    const information = {};


    return information;
}

class Data{
    constructor(){
        const programDirectory = getProgramDirectory();
        this._calendarPath = getCalendarDirectory(programDirectory);
    }

    getCalendarData(fileName){
        // credit: https://weblog.west-wind.com/posts/2014/Jan/06/JavaScript-JSON-Date-Parsing-and-real-Dates
        const reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
        const reMsAjax = /^\/Date\((d|-|.*)\)[\/|\\]$/;

        // the parser will convert the json representation of a date object to a date object
        return readFile(path.join(this._calendarPath, fileName), (key, value) => {
            if (typeof value === 'string') {
                let a = reISO.exec(value);
                if (a)
                    return new Date(value);
                a = reMsAjax.exec(value);
                if (a) {
                    const b = a[1].split(/[-+,.]/);
                    return new Date(b[0] ? +b[0] : 0 - +b[1]);
                }
            }
            return value;
        });
    }

    setCalendarData(fileName, jsonString){
        writeFile(path.join(this._calendarPath, fileName), jsonString);
    }
}

// Create a single instance
const data = new Data();

export default data;