import { IAppState } from '../state/app.state';
import { createSelector } from '@ngrx/store';
import { IUserState } from '../state/user.state';

const selectUsers = (state : IAppState) => state.users;

/**
 * It makes no sense to repeat selections of slices of our state all over the place, 
 * so let’s create some selectors that we can re-use.
 */
export const selectUserList = createSelector(
	selectUsers,
	(state: IUserState) => state.users
);

export const selectSelectedUser = createSelector(
	selectUsers,	
	(state: IUserState) => state.selctedUser
);
