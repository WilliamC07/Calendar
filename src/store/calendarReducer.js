import {
    SET_DAY_SELECTED,
    SET_MONTH_YEAR_SELECTED,
    ADD_CATEGORY,
    UPDATE_CATEGORY,
    DELETE_CATEGORY,
    SET_CATEGORIES, SET_EVENT, CREATE_EVENT
} from "../newCalendar/actions";
import moment from "moment";
import Category from "../data/calendar/Category";
import Event from "../data/calendar/Event";
import {getEvents, getCategories} from '../data/calendar/data';

/**
 *
 * @type {{daySelected: moment, monthYearSelected: moment, categories: Category[], events: Event[]}}
 */
const initialState = {
    monthYearSelected: moment(),
    daySelected: moment(),
    /**
     * [{id: #, name: "", color: "", description: ""}]
     */
    categories: getCategories(),
    /**
     * [{id: #, name: "", description: "", category: #, start: moment, end: moment}
     */
    events: getEvents()
};

export default function calendarReducer(state = initialState, action){
    switch(action.type){
        case SET_DAY_SELECTED:
            return {
                ...state,
                daySelected: action.moment,
            };
        case SET_MONTH_YEAR_SELECTED:
            return {
                ...state,
                monthYearSelected: action.moment,
            };
        case ADD_CATEGORY:
            return {
                ...state,
                categories: [...state.categories, action.category]
            };
        case UPDATE_CATEGORY:
            return {
                ...state,
                categories: [...state.categories.filter(c => c.id !== action.category.id), action.category]
            };
        case DELETE_CATEGORY:
            return {
                ...state,
                categories: state.categories.filter(c => c.id !== action.id)
            };
        case SET_CATEGORIES:
            return {
                ...state,
                categories: action.categories,
            };
        case CREATE_EVENT:
            return {
                ...state,
                events: [...state.events, action.event]
            };
        case SET_EVENT:
            return {
                ...state,
                events: action.events
            };
        default:
            return state;
    }
}