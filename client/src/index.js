import React from 'react';
import ReactDOM from 'react-dom/client'; //  Use createRoot for React 18
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux'; // Fix createStore import
import {thunk} from 'redux-thunk';

import reducers from '../src/reducers/index';
import App from './App';
import './index.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
