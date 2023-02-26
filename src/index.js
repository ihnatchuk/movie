import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import {BrowserRouter} from "react-router-dom";
import {storeSetup} from "./redux";

import App from './App';
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));

const store=storeSetup()

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);