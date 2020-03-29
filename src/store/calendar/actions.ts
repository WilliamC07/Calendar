import {Moment} from 'moment';
import {action} from 'typesafe-actions';
import {CalendarActionsTypes} from "./types";
import Category from "../../calendar/category";
import Event from "../../calendar/event";

export const setMonthYearSelected = (moment: Moment) => action(CalendarActionsTypes.SET_MONTH_YEAR_SELECTED, moment);
export const setDaySelected = (moment: Moment) => action(CalendarActionsTypes.SET_DAY_SELECTED, moment);
export const createCategory = (category: Category) => action(CalendarActionsTypes.CREATE_CATEGORY, category);
export const updateCategory = (category: Category) => action(CalendarActionsTypes.UPDATE_CATEGORY, category);
export const deleteCategory = (id: number) => action(CalendarActionsTypes.DELETE_CATEGORY, id);
export const setCategories = (categories: Category[]) => action(CalendarActionsTypes.SET_CATEGORIES, categories);
export const createEvent = (event: Event) => action(CalendarActionsTypes.CREATE_EVENT, event);
export const updateEvent = (event: Event) => action(CalendarActionsTypes.UPDATE_EVENT, event);
export const setEvents = (events: Event[]) => action(CalendarActionsTypes.SET_EVENTS, events);