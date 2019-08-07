import {
    SET_DAY_SELECTED,
    SET_MONTH_YEAR_SELECTED,
} from "../newCalendar/actions";
import moment from "moment";

const initialState = {
    monthYearSelected: moment(),
    daySelected: moment(),
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
        default:
            return state;
    }
}