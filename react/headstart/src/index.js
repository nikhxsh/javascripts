import React from 'react';
import ReactDOM from 'react-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './components/App';
import configureStore from './components/wineshop/configureStore';
import { Provider as ReduxProvider } from 'react-redux';
import InitialState from './components/wineshop/initialState';

const store = configureStore(InitialState);

ReactDOM.render(<ReduxProvider store={store}><App /></ReduxProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
