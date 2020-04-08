import * as wineryActions from './wineshopActions';
import * as types from './actionTypes';
import { mockWineries } from '../../../Test/WineryMockData';

import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
	afterEach(() => {
		fetchMock.restore();
	});

	it('Should create BEGIN_API_CALL & GET_WINERIES_SUCCESS while loading wineries', () => {
		fetchMock.mock('*', {
			body: { result: mockWineries },
			headers: { 'content-type': 'application/json' }
		});

		const expectedAction = [
			{ type: types.BEGIN_API_CALL },
			{ type: types.GET_WINERIES_SUCCESS, wineries: mockWineries }
		];

		const store = mockStore({});
		return store.dispatch(wineryActions.getWineries("")).then(() => {
			const actions = store.getActions();
			expect(actions).toEqual(expectedAction);
		});
	});
});


describe('Winery Actions', () => {
	const winery = mockWineries[0];

	it('Should create a CREATE_WINERY_SUCCESS action', () => {
		//arrange
		const expectedAction = {
			type: types.CREATE_WINERY_SUCCESS,
			winery
		}

		//act
		const action = wineryActions.createWinerySuccess(winery);

		//assert
		expect(action).toEqual(expectedAction);

	});
});
