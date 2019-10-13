import {sterializeValuesForQuery} from "../data.js";
import {
    addCategory,
    deleteCategory,
    updateCategory,
    setCategories,
    addEvent
} from "../../newCalendar/actions";
const sqlite3 = window.require('sqlite3').verbose();
const table_name_calendar = "calendar";
const TABLE_CATEGORY = "category";
const TABLE_EVENTS = "events";

export default function calendarClosure(database_path){
    const database = new sqlite3.Database(database_path);

    const upCategory = "CREATE TABLE IF NOT EXISTS " + TABLE_CATEGORY + " ("
        + " id INTEGER PRIMARY KEY, "
        + " name TEXT, "
        + " color TEXT, "
        + " description TEXT)";
    const downCategory = "DROP TABLE IF EXISTS " + TABLE_CATEGORY + ";";
    const upEvents = "CREATE TABLE IF NOT EXISTS " + TABLE_EVENTS + " ("
        + "id INTEGER PRIMARY KEY, "
        + "title TEXT, "
        + "description TEXT, "
        + "category INTEGER, "
        + "start TEXT, "
        + "end TEXT, "
        + "FOREIGN KEY (category) REFERENCES category (id));";
    const downEvents = "DROP TABLE IF EXISTS " + TABLE_EVENTS + ";";
    // testing purposes only
    const seed = (function(){
        let base = "INSERT INTO " + TABLE_CATEGORY + " ( name, color, description ) VALUES ";
        const seedData = ["('school', '#1495e0', 'school work'), ", "('entertainment', '#53dd6c', 'fun stuff :)')"];
        seedData.forEach(value => base += value + " ");
        return base;
    })();

    // migration
    database.serialize(() => {
        database.run(upCategory);
        database.run(upEvents);
    });
    return {
        down: () => {
            database.serialize(() => {
                database.run(downCategory);
                database.run(downEvents);
            });
        },

        insertCategory: (category, dispatch) => {
            const input = sterializeValuesForQuery([category.name, category.color, category.description]);
            database.run("INSERT INTO " + TABLE_CATEGORY + " ( name, color, description ) VALUES ( " + input + " );", [], function (err) {
                if(err){
                    console.log(err);
                }else{
                    category.id = this.lastID;
                    dispatch(addCategory(category));
                }
            });
        },

        insertEvent: (event, dispatch) => {
            const input = sterializeValuesForQuery([event.title, event.description, event.category, event.momentStart.toISOString(), event.momentEnd.toISOString()])
            database.run("INSERT INTO " + TABLE_EVENTS + " ( title, description, category, start, end ) VALUES ( " + input + ");", [], function(err){
                if(err){
                    console.log(err);
                }else{
                    event.id = this.lastID;
                    dispatch(addEvent(event))
                }
            })
        },

        removeCategory: (id, dispatch) => {
            database.run("DELETE FROM " + TABLE_CATEGORY + " WHERE id = " + id + ";", [], function(err){
                if(err){
                    console.log(err);
                }else{
                    dispatch(deleteCategory(id));
                }
            });
        },

        updateCategory: (category, dispatch) => {
            database.run(`UPDATE ${TABLE_CATEGORY} SET
            name = '${category.name}',
            color = '${category.color}', 
            description = '${category.description}' 
            WHERE id = ${category.id}`, [], function(err) {
                if(err){
                    console.log(err);
                }else{
                    dispatch(updateCategory(category));
                }
            });
        },

        getCategories: (dispatch) => {
            database.all("SELECT * FROM " + TABLE_CATEGORY, [], function(err, rows){
                if(err){
                    console.log(err);
                } else{
                    dispatch(setCategories(rows));
                }
            });
        },

        getEvents: (dispatch) => {

        }
    }
};