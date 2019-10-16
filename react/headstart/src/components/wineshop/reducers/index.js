import { combineReducers } from 'redux';
import wineries from './wineshopReducer';

const rootReducer = combineReducers({
	wineries
});

export default rootReducer;