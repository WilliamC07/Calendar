import {Moment} from 'moment';
import {CalendarActionsTypes} from "./types";
import Category from "../../calendar/category";
import Event from "../../calendar/event";
import {createAction} from "@reduxjs/toolkit";

export const setMonthYearSelected = createAction<Moment>(CalendarActionsTypes.SET_MONTH_YEAR_SELECTED);
export const setDaySelected = createAction<Moment>(CalendarActionsTypes.SET_MOMENT_SELECTED);
export const createCategory = createAction<Category>(CalendarActionsTypes.CREATE_CATEGORY);
export const updateCategory = createAction<Category>(CalendarActionsTypes.UPDATE_CATEGORY);
export const deleteCategory = createAction<Number>(CalendarActionsTypes.DELETE_CATEGORY);
export const setCategories = createAction<Category[]>(CalendarActionsTypes.SET_CATEGORIES);
export const createEvent = createAction<Event>(CalendarActionsTypes.CREATE_EVENT);
export const updateEvent = createAction<Event>(CalendarActionsTypes.UPDATE_EVENT);
export const setEvents = createAction<Event[]>(CalendarActionsTypes.SET_EVENTS);