import {getFileContent, setFileContent} from "../data.js";
import Category from "./category";

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
    const categories = data[moment.toISOString()];
    if(categories == null){
        return [];
    }else{
        const output = [];
        for(const category of categories){
            const {description, cost} = JSON.parse(category);
            output.push(new Category(description, cost));
        }
        return output;
    }
}

function addCategoryForMoment(moment, category){
    const information = data[moment.toISOString()];
    if(information == null){
        data[moment.toISOString()] = [JSON.stringify(category)];
    }else{
        information.push(JSON.stringify(category));
    }
}

export {
    save,
    getCurrentBalance,
    listDataForMoment,
    addCategoryForMoment,
}