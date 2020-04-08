import { Action } from '@ngrx/store';
import { IAccount } from '../models/account.contract';

export enum AccountActions {
	GetAccounts = '[Account] Get Accounts',
	GetAccountsResponse = '[Account] Get Accounts Response',
	GetAccount = '[Account] Get Account',
	GetAccountResponse = '[Account] Get Account Response',
	CreateAccount = '[Account] Create Account'
}

/**
 * Action creators are precisely the functions/classes that create actions.
 */
export class GetAccounts implements Action {
	public readonly type = AccountActions.GetAccounts;
}

export class GetAccountsResponse implements Action {
	public readonly type = AccountActions.GetAccountsResponse;
	constructor(public payload: IAccount[]){}
}

export class GetAccount implements Action {
	public readonly type = AccountActions.GetAccount;
	constructor(public payload: IAccount){}
}

export class GetAccountResponse implements Action {
	public readonly type = AccountActions.GetAccountResponse;
	constructor(public payload: IAccount){}
}

export class CreateAccount implements Action {
	public readonly type = AccountActions.CreateAccount;
	constructor(public payload: IAccount){}
}

export type AccountActionsType = GetAccounts | GetAccountsResponse | GetAccount | GetAccountResponse | CreateAccount;