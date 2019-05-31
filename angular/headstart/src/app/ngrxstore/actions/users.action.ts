import { Action } from '@ngrx/store';
import { IUser } from '../models/config.contract';

export enum UsersActions {
	GetUsers = '[User] Get Users',
	GetUsersResponse = '[User] Get Users Response',
	GetUser = '[User] Get User',
	GetUserResponse = '[User] Get User Response',
	AddUser = '[User] Add User'
}

export class GetUsers implements Action {
	public readonly type = UsersActions.GetUsers;
}

export class GetUsersResponse implements Action {
	public readonly type = UsersActions.GetUsersResponse;
	constructor(public payload: IUser[]){}
}

export class GetUser implements Action {
	public readonly type = UsersActions.GetUser;
	constructor(public payload: number){}
}

export class GetUserResponse implements Action {
	public readonly type = UsersActions.GetUserResponse;
	constructor(public payload: IUser){}
}

export class AddUser implements Action {
	public readonly type = UsersActions.AddUser;
	constructor(public payload: IUser){}
}

export type UsersActionsType = GetUsers | GetUsersResponse | GetUser | GetUserResponse | AddUser;