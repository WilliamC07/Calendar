import {
    SET_DAY_SELECTED,
    SET_MONTH_YEAR_SELECTED,
} from "../newCalendar/actions";

export default function reducerCalendar(state, action){
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
            }
    }
}