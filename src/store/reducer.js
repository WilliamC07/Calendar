import {
    UPDATE_CURRENT_BALANCE,

} from '../money/actions';

const initialState = {
    currentBalance: 0,
};

function rootReducer(state = initialState, action){
    switch(action.type){
        case UPDATE_CURRENT_BALANCE:
            return {
                ...state,
                currentBalance: action.amount
            };
    }

    return state;
}



export default rootReducer;