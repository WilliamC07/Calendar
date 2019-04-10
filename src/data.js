const path = require('path');
const fs = require('fs');

/**
 * Head directory of the program.
 * @type {string} path to the program directory
 */
const programDirectory = path.join(require('os').homedir(), "Library", "Application Support", "CalendarJS");
createDirectoryIfMissing(programDirectory);

/**
 * All the subdirectories from the head directory of the program.
 * To add another directory, just follow the format in the object. The directory will be automatically created if it
 * does not exist.
 * @type {{calendarDirectory: string}}
 */
const subDirectories = {
    calendarDirectory: path.join(programDirectory, "calendar"),
};

/* create directories if missing */
for(let subDirectory in subDirectories){
    createDirectoryIfMissing(subDirectories[subDirectory]);
}

/**
 * Creates the directory given if one does not exists.
 * @param directoryPath String representation of the path to the directory
 */
function createDirectoryIfMissing(directoryPath){
    if(!fs.existsSync(directoryPath)){
        fs.mkdirSync(directoryPath);
    }
}

module.exports = {
    calendarDirectory: () => subDirectories.calendarDirectory,
    createFileIfMissing: (filePath) => fs.writeFile(filePath, "", (err) => {if(err) throw err}),
};