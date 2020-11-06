import moment from "moment";
import Category from "../../calendar/category";
import Event from "../../calendar/event";

export enum CalendarActionsTypes {
    SET_MONTH_YEAR_SELECTED = "@@calendar/SET_MONTH_YEAR_SELECTED",
    SET_MOMENT_SELECTED = "@@calendar/SET_MOMENT_SELECTED",
    CREATE_CATEGORY = "@@calendar/CREATE_CATEGORY",
    UPDATE_CATEGORY = "@@calendar/UPDATE_CATEGORY",
    DELETE_CATEGORY = "@@calendar/DELETE_CATEGORY",
    SET_CATEGORIES = "@@calendar/SET_CATEGORIES",
    CREATE_EVENT = "@@calendar/CREATE_EVENT",
    SET_EVENTS = "@@calendar/SET_EVENTS",
    UPDATE_EVENT = "@@calendar/UPDATE_EVENT",
}

export interface CalendarState {
    readonly monthYearSelected: number,
    readonly momentSelected: number,
    readonly categories: Category[],
    readonly events: Event[]
}