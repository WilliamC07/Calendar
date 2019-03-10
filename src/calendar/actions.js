import ActionTypes from './actionTypes';

export default {
    highlightIndex: (index) => {
        return {
            type: ActionTypes.HIGHLIGHT_INDEX,
            index: index
        }
    },

    setDateDisplaying: (date) => {

    }
};