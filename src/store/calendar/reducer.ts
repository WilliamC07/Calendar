import {CalendarState} from "./types";
import {getCategories, getEvents} from "../../data/calendar/data";
import moment from "moment";
import {createReducer} from "@reduxjs/toolkit";
import {
    createCategory, createEvent,
    deleteCategory,
    setCategories,
    setDaySelected, setEvents,
    setMonthYearSelected,
    updateCategory, updateEvent
} from "./actions";

const initialState: CalendarState = {
    categories: getCategories(),
    momentSelected: moment().valueOf(),
    events: getEvents(),
    monthYearSelected: moment().valueOf()
};

export const calendarReducer = createReducer(initialState, (builder)=>{
    builder
        .addCase(setMonthYearSelected, (state, action) => {
            return {
                ...state,
                monthYearSelected: action.payload.valueOf()
            };
        })
        .addCase(setDaySelected, (state, action) => {
            console.log(action.payload);
            return {
                ...state,
                momentSelected: action.payload.valueOf()
            };
        })
        .addCase(createCategory, (state, action) => {
            return {
                ...state,
                categories: [...state.categories, action.payload]
            };
        })
        .addCase(updateCategory, (state, action) => {
            return {
                ...state,
                categories: [...state.categories.filter(c => c.id !== action.payload.id), action.payload]
            };
        })
        .addCase(deleteCategory, (state, action) => {
            return {
                ...state,
                categories: state.categories.filter(c => c.id !== action.payload)
            };
        })
        .addCase(setCategories, (state, action) => {
            return {
                ...state,
                categories: action.payload
            };
        })
        .addCase(createEvent, (state, action) => {
            return {
                ...state,
                events: [...state.events, action.payload]
            };
        })
        .addCase(setEvents, (state, action) => {
            return {
                ...state,
                events: action.payload
            };
        })
        .addCase(updateEvent, (state, action) => {
            return {
                ...state,
                events: [...state.events.filter(e => e.id !== action.payload.id), action.payload]
            }
        });
});