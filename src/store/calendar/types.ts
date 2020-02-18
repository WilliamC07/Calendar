import moment from "moment";
import Category from "../../calendar/category";
import Event from "../../calendar/event";

export enum CalendarActionsTypes {
    SET_MONTH_YEAR_SELECTED = "@@calendar/SET_MONTH_YEAR_SELECTED",
    SET_DAY_SELECTED = "@@calendar/SET_DAY_SELECTED",
    CREATE_CATEGORY = "@@calendar/CREATE_CATEGORY",
    UPDATE_CATEGORY = "@@calendar/UPDATE_CATEGORY",
    DELETE_CATEGORY = "@@calendar/DELETE_CATEGORY",
    SET_CATEGORIES = "@@calendar/SET_CATEGORIES",
    CREATE_EVENT = "@@calendar/CREATE_EVENT",
    SET_EVENTS = "@@calendar/SET_EVENTS"
}

export interface CalendarState {
    readonly monthYearSelected: moment.Moment,
    readonly daySelected: moment.Moment,
    readonly categories: Category[],
    readonly events: Event[]
}