import {Reducer} from "redux";
import {CalendarActionsTypes, CalendarState} from "./types";
import {getCategories, getEvents} from "../../data/calendar/data";
import moment from "moment";

const initialState: CalendarState = {
    categories: getCategories(),
    momentSelected: moment(),
    events: getEvents(),
    monthYearSelected: moment()
};

export const calendarReducer: Reducer<CalendarState> = (state: CalendarState = initialState, action) => {
    switch(action.type){
        case CalendarActionsTypes.SET_MOMENT_SELECTED:
            return {
                ...state,
                momentSelected: action.payload,
            };
        case CalendarActionsTypes.SET_MONTH_YEAR_SELECTED:
            return {
                ...state,
                monthYearSelected: action.payload,
            };
        case CalendarActionsTypes.CREATE_CATEGORY:
            return {
                ...state,
                categories: [...state.categories, action.payload]
            };
        case CalendarActionsTypes.UPDATE_CATEGORY:
            return {
                ...state,
                categories: [...state.categories.filter(c => c.id !== action.payload.id), action.payload]
            };
        case CalendarActionsTypes.DELETE_CATEGORY:
            return {
                ...state,
                categories: state.categories.filter(c => c.id !== action.payload)
            };
        case CalendarActionsTypes.SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            };
        case CalendarActionsTypes.CREATE_EVENT:
            return {
                ...state,
                events: [...state.events, action.payload]
            };
        case CalendarActionsTypes.SET_EVENTS:
            return {
                ...state,
                events: action.payload
            };
        case CalendarActionsTypes.UPDATE_EVENT: {
            const newEvents = state.events.filter((event) => event.id !== action.payload.id);
            newEvents.push(action.payload);
            return {
                ...state,
                events: newEvents
            };
        }
        default:
            return state;
    }
};