const sqlite3 = require('sqlite3').verbose();
const table_name_calendar = "calendar";
const table_name_category = "category";

function calendarData(database){
    return {
        up: () => "create table if not exists " + table_name_category + " ("
                + " id integer primary key, "
                + " name text, "
                + " color text, "
                + " description text);",

        down: () => "drop table if exists " + table_name_category + ";",

        seed: () => {
            const output = [];
            const base = "insert into " + table_name_category + " ( name, color, description ) VALUES ( ";
            const seedData = ["'school', '#1495e0', 'school work'", "'entertainment', '#53dd6c', 'fun stuff :)'"];
            seedData.forEach(e => output.push(base + e + " );"));
            return output;
        },
    }
};