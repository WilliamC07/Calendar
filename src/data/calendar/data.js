import {sterializeValuesForQuery} from "../data.js";
import {
    addCategory,
    deleteCategory,
    updateCategory,
    setCategories,
} from "../../newCalendar/actions";
const sqlite3 = window.require('sqlite3').verbose();
const table_name_calendar = "calendar";
const TABLE_CATEGORY = "category";

export default function calendarClosure(database_path){
    const database = new sqlite3.Database(database_path);

    const up = "CREATE TABLE IF NOT EXISTS " + TABLE_CATEGORY + " ("
        + " id INTEGER PRIMARY KEY, "
        + " name TEXT, "
        + " color TEXT, "
        + " description TEXT)";
    const down = "DROP TABLE IF EXISTS " + TABLE_CATEGORY + ";";
    // testing purposes only
    const seed = (function(){
        let base = "INSERT INTO " + TABLE_CATEGORY + " ( name, color, description ) VALUES ";
        const seedData = ["('school', '#1495e0', 'school work'), ", "('entertainment', '#53dd6c', 'fun stuff :)')"];
        seedData.forEach(value => base += value + " ");
        return base;
    })();

    // migration
    database.serialize(() => database.run(up));
    return {
        down: () => {
            database.run(down);
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
        }
    }
};