import { combineReducers } from 'redux';
import wineries from './wineshopReducer';
import apiCallInProgress from './apiStatusReducer';

const rootReducer = combineReducers({
	wineries,
	apiCallInProgress
});

export default rootReducer;