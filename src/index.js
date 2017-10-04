import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import promise from 'redux-promise';


import './index.css';
import reducers from './reducers';
import Login from './components/login';
import Rooms from './components/rooms';
import registerServiceWorker from './registerServiceWorker';
import AuthService from "./utils/AuthService";

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            {
                AuthService.isLoggedIn() ?
                    <Switch>
                        <Route path='/' component={Rooms} />
                    </Switch>
                    :
                    <Switch>
                        <Route path='/' component={Login} />
                    </Switch>


            }

        </BrowserRouter>
    </Provider>

    , document.getElementById('root'));
registerServiceWorker();
