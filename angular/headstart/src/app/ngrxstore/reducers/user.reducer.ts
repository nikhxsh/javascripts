import { intialUserState } from '../state/user.state';
import { UsersActionsType, UsersActions } from '../actions/users.action';
import { IUserState } from '../state/user.state'

/**
 * Actions describe the fact that something happened but don’t specify how the application’s state changes in response. 
 * That is the job of reducers. Reducers are the pure functions that know what to do with a given action and the previous 
 * state of your application. The reducers will take the previous state from your store and apply a pure function to it and
 * transform into a new state.
 */
export const userReducers = (
	state = intialUserState,
	action: UsersActionsType
): IUserState => {
	switch (action.type) {
		case UsersActions.GetUsersResponse: {
			return {
				...state,
				users: action.payload
			}
		}
		case UsersActions.GetUserResponse: {
			return {
				...state,
				selctedUser: action.payload
			}
		}
		case UsersActions.AddUser: {
			return {
				...state,
				selctedUser: action.payload
			}
		}
		default:
			return state;
	}
};