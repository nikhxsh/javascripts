import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { routerReducer } from '@ngrx/router-store';
import { accountReducer } from './account.reducer';

export const appReducers : ActionReducerMap<IAppState, any> = {
	router: routerReducer,
	accounts: accountReducer
}