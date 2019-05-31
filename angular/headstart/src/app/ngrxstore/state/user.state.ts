import { IUser } from '../models/config.contract';


export interface IUserState {
	users: IUser[];
	selctedUser: IUser
}

export const intialUserState: IUserState = {
	users: null,
	selctedUser: null
};