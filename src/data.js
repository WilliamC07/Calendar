/*
 * This file should be used to gain data that was stored on disk.
 */
const path = require('path');
const fs = require('fs');

/*
    Check if there is data on where to write data for this program
  */
const fileInformationPath = "./file.json";
// sync because we need the data to continue
let fileInformation = {};
fs.readFileSync(fileInformationPath, (error, data) => {
    fileInformation = JSON.parse(data)
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

module.exports = {
    file: fileInformationPath
};