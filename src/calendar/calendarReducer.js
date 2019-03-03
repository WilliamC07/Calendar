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
    /**
     * Event id: event
     *
     * {
     *      1: event,
     *      2: event
     * }
     */
    events: {

    },

    nextEventID : 0,

    /**
     * Date object: event ids
     *
     * {
     *     Nov 2 2018: [1],
     *     Nov 3 2018: [1, 2],
     * }
     */
    dates: {

    },

    dateDisplaying: getTodayDate(),

    /**
     * The date on the calendar that the user is currently editing.
     */
    dateHighlight: undefined,

};

function reducer(oldState = initialState, action){

    switch(action.type){
        case actionType.addEvent:
            const eventToAdd = action.event;
            const dateToModify = action.date;
            eventToAdd.eventID = oldState.nextEventID;

            const newState = {};
            Object.assign(newState, oldState);

            // Pairs up the date and event
            if(newState.dates[dateToModify] === undefined){
                newState.dates[dateToModify] = [oldState.nextEventID];
            }else{
                newState.dates[dateToModify].concat(oldState.nextEventID);
            }

            // Add event to the list of events
            newState.events = {...oldState.events};
            newState.events[oldState.nextEventID] = eventToAdd;

            // Update the next available ID
            newState.nextEventID++;

            console.log(newState);

            return newState;
        default:
            return oldState;
    }
}

export default reducer;