import { intialAccountState } from '../state/account.state';
import { AccountActionsType, AccountActions } from '../actions/account.action';
import { IAccountState } from '../state/account.state'

/**
 * Actions describe the fact that something happened but don’t specify how the application’s state changes in response. 
 * That is the job of reducers. Reducers are the pure functions that know what to do with a given action and the previous 
 * state of your application. The reducers will take the previous state from your store and apply a pure function to it and
 * transform into a new state.
 */
export const accountReducer = (
	state = intialAccountState,
	action: AccountActionsType
): IAccountState => {
	switch (action.type) {
		case AccountActions.GetAccountsResponse: {
			return {
				...state,
				accounts: action.payload
			}
		}
		case AccountActions.GetAccountResponse: {
			return {
				...state,
				account: action.payload
			}
		}
		case AccountActions.CreateAccount: {
			return {
				...state,
				account: action.payload
			}
		}
		default:
			return state;
	}
};