import { intialUserState } from '../state/user.state';
import { UsersActionsType, UsersActions } from '../actions/users.action';
import { IUserState } from '../state/user.state'

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