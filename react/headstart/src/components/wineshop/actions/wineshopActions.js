import * as types from './actionTypes';
import * as wineryApi from '../../api/wineShopApi';
import { beginApiCall, apiCallFailed } from './apiStatusActions';

export function getWineriesSuccess(wineries) {
	return { type: types.GET_WINERIES_SUCCESS, wineries }
}

export function getWineries(queryString) {
	return function (dispatch) {
		dispatch(beginApiCall());
		return wineryApi.getWineries(queryString)
			.then(response => {
				dispatch(getWineriesSuccess(response.result))
			})
			.catch(error => {
				throw error;
			});
	}
}

export function createWinerySuccess(winery) {
	return { type: types.CREATE_WINERY_SUCCESS, winery }
}

export function updateWinerySuccess(winery) {
	return { type: types.EDIT_WINERY_SUCCESS, winery }
}

export function saveWinery(winery) {
	return function (dispatch) {
		dispatch(beginApiCall());
		return wineryApi.saveWinery(winery)
			.then(savedWinery => {
				winery.id
					? dispatch(updateWinerySuccess(savedWinery))
					: dispatch(createWinerySuccess(savedWinery))
			})
			.catch(error => {
				dispatch(apiCallFailed(error))
				throw error;
			});
	}
}

export function deleteWinerySuccess(deletedId) {
	return { type: types.DELETE_WINERY_SUCCESS, deletedId }
}

export function deleteWinery(wineryId) {
	return function (dispatch) {
		dispatch(beginApiCall());
		return wineryApi.deleteWinery(wineryId)
			.then(deletedId => {
				dispatch(deleteWinerySuccess(deletedId));
			})
			.catch(error => {
				dispatch(apiCallFailed(error))
				throw error;
			});
	}
}

export function getWinesFromWinerySuccess(content) {
	return { type: types.GET_WINES_FROM_WINERY_SUCCESS, content }
}

export function getWinesFromWinery(wineryId, queryString) {
	return function (dispatch) {
		dispatch(beginApiCall());
		return wineryApi.getWinesFromWinery(wineryId, queryString)
			.then(response => {
				var content = { wines: response.result, wineryId: wineryId };
				dispatch(getWinesFromWinerySuccess(content))
			})
			.catch(error => {
				throw error;
			});
	}
}