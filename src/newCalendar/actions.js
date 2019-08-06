export const SET_MONTH_YEAR_SELECTED = "SET_MONTH_YEAR_SELECTED";
export const SET_DAY_SELECTED = "SET_DAY_SELECTED";

export function setMonthYearSelected(moment){
    return {
        type: SET_MONTH_YEAR_SELECTED,
        moment: moment
    }
}

export function setDaySelected(moment){
    return {
        type: SET_DAY_SELECTED,
        moment: moment
    }
}