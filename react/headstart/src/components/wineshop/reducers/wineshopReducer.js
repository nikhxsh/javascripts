import * as types from '../actions/actionTypes';

export default function wineryReducer(state = [], action) {
	switch (action.type) {
		case types.CREATE_WINERY_SUCCESS:
			return [...state, { ...action.winery }]
		case types.EDIT_WINERY_SUCCESS:
			return state.map(winery => winery.id === action.winery.id ? action.winery : winery);
		case types.GET_WINERIES_SUCCESS:
			return action.wineries;
		case types.DELETE_WINERY_SUCCESS:
			return state.filter(x => x.id !== action.deletedId);
		default:
			return state;
	}
}