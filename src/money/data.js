import {getFileContent, setFileContent} from "../data.js";

const DIRECTORY_NAME = "money";
const FILE_NAME = "money.json";
let haveReadData = false;
let data;

function createFilesIfMissing(){
    if(Object.entries(getFileContent(DIRECTORY_NAME, FILE_NAME)).length === 0){
        const object = {currentBalance: 0};
        setFileContent(DIRECTORY_NAME, FILE_NAME, object);
    }
}

function load(){
    createFilesIfMissing();
    if(!haveReadData){
        haveReadData = true;
        data = getFileContent(DIRECTORY_NAME, FILE_NAME);
    }
}

function save(object){
    setFileContent(DIRECTORY_NAME, FILE_NAME, object);
}

function getCurrentBalance(){
    load();
    return data.currentBalance;
}

function listDataForMoment(moment){
    load();
    const information = data[moment.toISOString()];
    if(information == null){
        return [];
    }else{
        return information;
    }
}

function addCategoryForMoment(moment, category){
    const information = data[moment.toISOString()];
    if(information == null){
        data[moment.toISOString()] = [category];
    }else{
        information.push(category);
    }
}

export {
    save,
    getCurrentBalance,
    listDataForMoment,
    addCategoryForMoment,
}