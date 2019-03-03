import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';
import {Provider} from 'react-redux';
import store from './store.js';
import actions from './calendar/actions'
import Event from './calendar/event.js';

window.store = store;
window.addEvent = actions.addEvent;
window.Event = Event;

// The first view is the dashboard
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
