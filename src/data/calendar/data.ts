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
 * @param newCategory new category created. ID will be set
 */
export function createCategory(newCategory: Category){
    const info = connection.prepare(`INSERT INTO ${TABLE_CATEGORY} (name, color, description) VALUES(?, ?, ?)`)
      .run(newCategory.name, newCategory.color, newCategory.description);
    newCategory.id = info.lastInsertRowid;
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
export function createEvent(newEvent: Event){
    const info = connection
        .prepare(`INSERT INTO ${TABLE_EVENTS} ( title, description, category, isAllDay, start, end ) VALUES (?, ?, ?, ?, ?, ?)`)
        .run(newEvent.title, newEvent.description, newEvent.category, newEvent.isAllDay ? 1 : 0, newEvent.start.toISOString(), newEvent.end.toISOString());

    newEvent.id = info.lastInsertRowid;
}

/**
 * Updates the database to reflect the updated event
 * @param event
 */
export function updateEvent(event: Event){
    const query = `
    UPDATE ${TABLE_EVENTS}
    SET 
        title = ?,
        description = ?,
        category = ?,
        isAllDay = ?,
        start = ?,
        end = ?
    WHERE
        id = ?
    `;
    connection.prepare(query).run(event.title, event.description, event.category, event.isAllDay ? 1 : 0, event.start.toISOString(), event.end.toISOString(), event.id);
}

/**
 * Update the given category
 * @param newCategory updated category
 */
export function updateCategory(newCategory: Category){
    connection.prepare(`UPDATE ${TABLE_CATEGORY} SET name = ?, color = ?, description = ? WHERE id = ?`)
      .run(newCategory.name, newCategory.color, newCategory.description, newCategory.id);
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
        const category = new Category(data[i].name, data[i].color, data[i].description);
        category.id = data[i].id;
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