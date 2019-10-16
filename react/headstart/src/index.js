import React from 'react';
import ReactDOM from 'react-dom';

import './bootstrap.min.css'
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './components/App';
import configureStore from './components/wineshop/configureStore';
import { Provider as ReduxProvider } from 'react-redux';

const store = configureStore();

ReactDOM.render(<ReduxProvider store={store}><App /></ReduxProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
