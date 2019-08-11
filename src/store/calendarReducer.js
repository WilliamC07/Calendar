import {
    SET_DAY_SELECTED,
    SET_MONTH_YEAR_SELECTED,
    ADD_CATEGORY,
    UPDATE_CATEGORY,
    DELETE_CATEGORY,
    SET_CATEGORIES
} from "../newCalendar/actions";
import moment from "moment";
import category from "../money/category";

const initialState = {
    monthYearSelected: moment(),
    daySelected: moment(),
    categories: []
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
        default:
            return state;
    }
}