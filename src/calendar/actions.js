import actionTypes from './actionTypes';

export default {
    addEvent: (date, event) => {
        return {
            type: actionTypes.addEvent,
            event: event,
            date: date
        }
    }
}