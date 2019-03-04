import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';
import {Provider} from 'react-redux';
import store from './store.js';

// The first view is the dashboard
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
