import { RouterReducerState } from "@ngrx/router-store"
import { IUserState, intialUserState } from './user.state';

export interface IAppState {
	router?: RouterReducerState,
	users: IUserState
}

export const initialAppState: IAppState = {
	users: intialUserState
};

export function GetInitialState(): IAppState {
	return initialAppState;
}