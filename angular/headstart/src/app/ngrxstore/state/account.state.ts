import { IAccount } from '../models/account.contract';


export interface IAccountState {
	accounts: IAccount[];
	account: IAccount
}

export const intialAccountState: IAccountState = {
	accounts: null,
	account: null
};