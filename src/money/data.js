import {getFileContent, setFileContent} from "../data.js";

const DIRECTORY_NAME = "money";
const FILE_NAME = "money.json";
let cache = {};

function createFilesIfMissing(){
    if(Object.entries(getFileContent(DIRECTORY_NAME, FILE_NAME)).length === 0){
        const object = {currentBalance: 0};
        setFileContent(DIRECTORY_NAME, FILE_NAME, object);
    }
}

function load(){
    createFilesIfMissing();
    if(Object.entries(cache).length === 0){
        cache = getFileContent(DIRECTORY_NAME, FILE_NAME);
    }
}

function save(object){
    setFileContent(DIRECTORY_NAME, FILE_NAME, object);
}

function getCurrentBalance(){
    load();
    return cache.currentBalance;
}

function getInformationForDate(moment){
    load();
    return cache[moment.toISOString()];
}

export {
    save,
    getCurrentBalance,
    getInformationForDate
}