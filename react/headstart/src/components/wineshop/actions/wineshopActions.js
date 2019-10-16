import * as types from './actionTypes';
import * as wineryApi from '../../api/wineShopApi';

export function getWineriesSuccess(wineries) {
	return { type: types.GET_WINERIES_SUCCESS, wineries }
}

export function getWineries(queryString) {
	return function (dispatch) {
		return wineryApi.getWineries(queryString)
			.then(wineries => {
				dispatch(getWineriesSuccess(wineries))
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
		return wineryApi.saveWinery(winery)
			.then(savedWinery => {
				winery.id
					? dispatch(updateWinerySuccess(winery))
					: dispatch(createWinerySuccess(winery))
			})
			.catch(error => {
				throw error;
			});
	}
}