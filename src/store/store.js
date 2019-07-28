import {createStore} from 'redux';
import rootReducer from './reducer';
import {updateCurrentBalance} from "../money/actions";

const store = createStore(rootReducer);

window.store = store;
window.updateCurrentBalance = updateCurrentBalance;

export default store;