import * as types from '../actions/actionTypes';
import Wineries from '../wineryManagement/Wineries';

export default function wineryReducer(state = [], action) {
	switch (action.type) {
		case types.GET_WINERIES_SUCCESS:
			return action.wineries;
		case types.GET_WINES_FROM_WINERY_SUCCESS:
			let newState = state.map(winery => winery.id === action.content.wineryId
				? Object.assign({}, winery, { products: action.content.wines })
				: Object.assign({}, winery))
			return newState;
		case types.CREATE_WINERY_SUCCESS:
			return [...state, { ...action.winery }]
		case types.EDIT_WINERY_SUCCESS:
			return state.map(winery => winery.id === action.winery.id ? action.winery : winery);
		case types.DELETE_WINERY_SUCCESS:
			return state.filter(x => x.id !== action.deletedId);
		default:
			return state;
	}
}