import * as types from './actionTypes';

export function beginApiCall() {
	return { type: types.BEGIN_API_CALL }
}

export function apiCallFailed(error) {
	return { type: types.API_CALL_FAILED, error }
}