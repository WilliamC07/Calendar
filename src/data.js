const path = window.require('path');
const fs = window.require('fs');
const sqlite3 = window.require('sqlite3');

/**
 * Head directory of the program.
 * @type {string} path to the program directory
 */
const programDirectory = path.join(window.require('os').homedir(), "Library", "Application Support", "CalendarJS");
createDirectoryIfMissing(programDirectory);

/**
 * All the subdirectories from the head directory of the program.
 * To add another directory, just follow the format in the object. The directory will be automatically created if it
 * does not exist.
 * @type {{calendarDirectory: string}}
 */
const subDirectories = {
    calendarDirectory: path.join(programDirectory, "calendar"),
    moneyDirectory: path.join(programDirectory, "money"),
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

function getFileContent(directoryName, fileName){
    const pathToFile =  path.join(subDirectories[directoryName + "Directory"], fileName);
    if(!fs.existsSync(pathToFile)){
        return {};
    }
    return JSON.parse(fs.readFileSync(pathToFile));
}

function setFileContent(directoryName, fileName, object){
    const data = JSON.stringify(object, null, 2);
    fs.writeFileSync(path.join(subDirectories[directoryName + "Directory"], fileName), data);
}

module.exports = {
    calendarDirectory: subDirectories.calendarDirectory,
    getFileContent,
    setFileContent,
    createFileIfMissing: (filePath) => fs.writeFile(filePath, "", (err) => {if(err) throw err}),
};