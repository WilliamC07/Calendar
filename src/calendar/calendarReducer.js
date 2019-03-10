import actionType from './actionTypes';

/**
 * Creates a new date object representing the first day of the current month. This only holds information about the
 * current year, month, and day of the month. This does not contain hours, minute, seconds, nor milliseconds.
 * @returns {Date}
 */
function getTodayDate(){
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    today.setDate(1);
    return today;
}

const initialState = {
    dateDisplaying: getTodayDate(),

    /**
     * Index of the calendar day current being modified.
     */
    dateHighlight: -1,
};

function reducer(oldState = initialState, action){
    switch(action.type){
        case actionType.HIGHLIGHT_INDEX:
            return Object.assign({}, oldState, {dateHighlight: action.index});
        default:
            return oldState;
    }
}

export default reducer;