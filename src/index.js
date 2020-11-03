import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './app.jsx';
import {store} from './store/index';

// The first view is the dashboard
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);