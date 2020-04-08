import wineShopReducer from './wineshopReducer';
import * as actions from '../actions/wineshopActions';

describe('Winery reducer', () => {
	it('should add winery when passed CREATE_WINERY_SUCCESS', () => {
		const initialState = [
			{
				name: 'x',
				region: 'y',
				country: 'z'
			}
		];

		const newWinery = {
			name: 'xn',
			region: 'yn',
			country: 'zn'
		};

		const action = actions.createWinerySuccess(newWinery);

		//act
		const newState = wineShopReducer(initialState, action);

		//assert
		expect(newState.length).toEqual(2);
		expect(newState[0].name).toEqual('x');
		expect(newState[1].name).toEqual('xn');
	});
});