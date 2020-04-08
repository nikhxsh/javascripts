import { IAppState } from '../state/app.state';
import { createSelector } from '@ngrx/store';
import { IAccountState } from '../state/account.state';

const accounts = (state : IAppState) => state.accounts;

/**
 * It makes no sense to repeat selections of slices of our state all over the place, 
 * so let’s create some selectors that we can re-use.
 */
export const accountsSelector = createSelector(
	accounts,
	(state: IAccountState) => state.accounts
);

export const accountSelector = createSelector(
	accounts,	
	(state: IAccountState) => state.account
);
