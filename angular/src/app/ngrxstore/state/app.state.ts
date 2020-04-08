import { RouterReducerState } from "@ngrx/router-store"
import { IAccountState, intialAccountState } from './account.state';

export interface IAppState {
	router?: RouterReducerState,
	accounts: IAccountState
}

export const initialAppState: IAppState = {
	accounts: intialAccountState
};

export function GetInitialState(): IAppState {
	return initialAppState;
}