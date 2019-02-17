/*
 * This file should be used to gain data that was stored on disk.
 */
const path = require('path');
const fs = require('fs');

/*
    Check if there is data on where to write data for this program
  */

// sync because we need the data to continue
let fileInformation = {};
fs.readFileSync(path.join(fileInformationPath, "config.json"), (error, data) => {
    fileInformation = JSON.parse(data);
});
// Update the file system to have the latest information
if (fileInformation.programDirectory === undefined) {
    // Get a path to store this program data. This is for MacOS.
    const pathToProgramDirectory = path.join(require('os').homedir(), "Library", "Application Support", "ArchJS");
    fileInformation.programDirectory = pathToProgramDirectory;
    fs.mkdir(pathToProgramDirectory, (error) => {/* Do nothing */
    });
    // Update the json file to have the latest information. Async because no other file depends on it.
    fs.writeFile(fileInformationPath, JSON.stringify(fileInformation), (error) => {/* Do nothing */
    });
}

/*
    Make directories to store information about the program.
 */
const directories = ['Calendar'];
for (let directory of directories) {
    const subDirectory = path.join(fileInformation.programDirectory, directory);
    fs.mkdir(subDirectory, (error) => {/* Do nothing */});
}

function getProgramDirectory(){
    const programDirectoryPath = path.join("/Users/williamcao/Library", "Application Support", "ArchJS");
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

function readFile(filePath){
    if(!fs.existsSync(filePath)){
        // create the file if one doesn't exists
        fs.writeFileSync(filePath, "", 'w');
        return null;
    }else{
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
}

function readConfig(){
    const information = {};


    return information;
}

class Data{
    #calendarPath;

    constructor(){
        const programDirectory = getProgramDirectory();
        this.#calendarPath = getCalendarDirectory(programDirectory);
    }

    getCalendarData(fileName){
        return readFile(path.join(this.#calendarPath, fileName));
    }
}

// Create a single instance
const data = new Data();
// Make sure it is a singleton
Object.freeze(data);

export default data;