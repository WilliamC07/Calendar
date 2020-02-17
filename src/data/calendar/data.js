import {subDirectories} from "../data";
import Category from './Category';
import moment from 'moment';
import Event from './Event';
const path = require("path");
const Database = window.require("better-sqlite3");

const TABLE_CATEGORY = "category";
const TABLE_EVENTS = "events";

/**
 * @type {Database} Database connection
 */
const connection = new Database(path.join(subDirectories.calendarDirectory, "data.sqlite3"), {verbose: console.log});
// Create tables
connection.exec(`CREATE TABLE IF NOT EXISTS ${TABLE_CATEGORY} (
    id INTEGER PRIMARY KEY,
    name TEXT,
    color TEXT,
    description TEXT)`);
connection.exec(`CREATE TABLE IF NOT EXISTS ${TABLE_EVENTS} (
    id INTEGER PRIMARY KEY,
    title TEXT,
    description TEXT,
    category id,
    isAllDay INTEGER,
    start TEXT,
    end TEXT,
    foreign key (category) REFERENCES category (id));`);

/**
 * Creates a new category and store to disk.
 * @param categoryDetails {Array.<{name: string, color: string, description: string}>}
 * @return {Category}
 */
export function createCategory(categoryDetails){
    const info = connection.prepare(`INSERT INTO ${TABLE_CATEGORY} (name, color, description) VALUES(?, ?, ?)`).run(...categoryDetails);
    const category = new Category(...categoryDetails);
    category.id = info.lastInsertRowid;
    return category;
}

/**
 * Deletes category of the given id number
 * @param categoryID {number}
 */
export function deleteCategory(categoryID){
    connection.prepare(`DELETE FROM ${TABLE_CATEGORY} WHERE id = ?`).run(categoryID);
}

/**
 * Creates a new event
 * @param eventDetails {Array.<{title: string, description: string, category: number, isAllDay: boolean, start: Moment, end: Moment}>} Will be modified by this function.
 * @returns {Event}
 */
export function createEvent(eventDetails){
    eventDetails[3] = eventDetails[3] ? 1 : 0; // sqlite3 cannot store boolean, only integer
    eventDetails[4] = eventDetails[4].toISOString();
    eventDetails[5] = eventDetails[5].toISOString();
    const info = connection.prepare(`INSERT INTO ${TABLE_EVENTS} ( title, description, category, isAllDay, start, end ) VALUES (?, ?, ?, ?, ?, ?)`).run(...eventDetails);
    const event = new Event(...eventDetails);
    event.id = info.lastInsertRowid;
    return event;
}

/**
 * Update the given category
 * @param id {number} id of the category to update
 * @param categoryDetails {Array.<{name: string, color: string, description: string}>}
 * @return {Category} New Category instance with updated values
 */
export function updateCategory(id, categoryDetails){
    connection.prepare(`UPDATE ${TABLE_CATEGORY} SET name = ?, color = ?, description = ? WHERE id = ?`).run(...categoryDetails, id);
    const updatedCategory = new Category(...categoryDetails);
    updatedCategory.id = id;
    return updatedCategory;
}

/**
 * Gets all the created categories
 * @returns {Category[]}
 */
export function getCategories(){
    const data = connection.prepare(`SELECT * FROM ${TABLE_CATEGORY}`).all();
    // convert object to Category object
    const categories = new Array(data.length).fill(new Category());
    for(let i = 0; i < data.length; i++){
        Object.assign(categories[i], data[i]);
    }
    return categories;
}

/**
 * Gets all the created Events
 * @returns {Event[]}
 */
export function getEvents(){
    const data = connection.prepare(`SELECT * FROM ${TABLE_EVENTS}`).all();
    // convert data to Event object
    const events = [];
    for(let i = 0; i < data.length; i++){
        const event = new Event();
        data[i][4] = data[i][4] ? true : false;  // need to convert sqlite3 integer to boolean
        Object.assign(event, data[i]);
        events.push(event);
    }
    return events;
}