import {programDirectory} from "../../public/electron.js";
const fileSystem = require('fs');
const path = require('path');

const data = {
    apples: "good"
};

function writeToDisk(){
    fileSystem.writeFile(path.join(programDirectory, "calendarInformation"), data, (err) => console.log(err));
}