import {subDirectories} from "../data";
import Category from '../../calendar/category';
import moment, {Moment} from 'moment';
import Event from '../../calendar/event';
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
 * @param categoryDetails [name of category, color of category, description of category]. color should be formatted as "#xxxxxx"
 * @return Newly created category
 */
export function createCategory(categoryDetails: [string, string, string]): Category{
    const info = connection.prepare(`INSERT INTO ${TABLE_CATEGORY} (name, color, description) VALUES(?, ?, ?)`).run(...categoryDetails);
    const category = new Category(...categoryDetails);
    category.id = info.lastInsertRowid;
    return category;
}

/**
 * Deletes category of the given id number
 * @param categoryID id of the category to be deleted
 */
export function deleteCategory(categoryID: number){
    connection.prepare(`DELETE FROM ${TABLE_CATEGORY} WHERE id = ?`).run(categoryID);
}

/**
 * Creates a new event
 * @param eventDetails [title, description, id of category corresponding, isAllDay, start moment, end moment].
 * @returns Newly created event
 */
export function createEvent(eventDetails: [string, string, number, boolean, moment.Moment, moment.Moment]): Event{
    const formattedData = [
        eventDetails[0], // title
        eventDetails[1], // description
        eventDetails[2], // id of category corresponding to this event
        eventDetails[3] ? 1 : 0, // isAllDay. Sqlite3 does not store boolean, we must convert to integer
        eventDetails[4].toISOString(), // start of the event
        eventDetails[5].toISOString() // end of the event
    ];
    const info = connection.prepare(`INSERT INTO ${TABLE_EVENTS} ( title, description, category, isAllDay, start, end ) VALUES (?, ?, ?, ?, ?, ?)`).run(...formattedData);

    const event = new Event(...eventDetails);
    event.id = info.lastInsertRowid;
    return event;
}

/**
 * Update the given category
 * @param id id of the category to update
 * @param categoryDetails [name, color, description]
 * @return New Category instance with updated values
 */
export function updateCategory(id: number, categoryDetails: [string, string, string]){
    connection.prepare(`UPDATE ${TABLE_CATEGORY} SET name = ?, color = ?, description = ? WHERE id = ?`).run(...categoryDetails, id);
    const updatedCategory = new Category(...categoryDetails);
    updatedCategory.id = id;
    return updatedCategory;
}

/**
 * Gets all the created categories
 * @returns List of all the categories the user created
 */
export function getCategories(){
    const data = connection.prepare(`SELECT * FROM ${TABLE_CATEGORY}`).all();
    // convert object to Category object
    const categories: Category[] = [];
    for(let i = 0; i < data.length; i++){
        const category = new Category("", "", "");
        Object.assign(category, data[i]);
        categories.push(category);
    }
    return categories;
}

/**
 * Gets all the created Events.
 * @returns List of all the events the user created
 */
export function getEvents(): Event[]{
    interface DataStructure {
        id: number;
        title: string;
        description: string;
        category: number;
        isAllDay: number;
        end: string;
        start: string
    }
    const data: DataStructure[] = connection.prepare(`SELECT * FROM ${TABLE_EVENTS}`).all();
    // convert data to Event object
    const events = [];
    for(let i = 0; i < data.length; i++){
        const rawEvent = data[i];
        const event = new Event(rawEvent.title, rawEvent.description, rawEvent.category, !!rawEvent.isAllDay, moment(rawEvent.start), moment(rawEvent.end));
        event.id = rawEvent.id;
        events.push(event);
    }
    return events;
}