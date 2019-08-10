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


export const ADD_CATEGORY = "ADD_CATEGORY";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";

export function addCategory(category){
    return {
        type: ADD_CATEGORY,
        category: category
    }
}
export function updateCategory(category){
    return {
        type: UPDATE_CATEGORY,
        category: category
    }
}
export function deleteCategory(category){
    return {
        type: DELETE_CATEGORY,
        category: category
    }
}