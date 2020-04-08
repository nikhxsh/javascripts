import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
//https://www.npmjs.com/package/redux-immutable-state-invariant
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from 'redux-thunk';

export default function configureStore(intialState) {
	const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //Add support for redux dev tools
	return createStore(
		rootReducer,
		intialState,
		composeEnhancer(applyMiddleware(thunk, reduxImmutableStateInvariant())));
}