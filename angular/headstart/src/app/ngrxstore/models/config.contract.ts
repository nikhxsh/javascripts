export interface IUser {
	id: number;
	name: string;
	cardNumber: string;
	cardType: string;
}

export interface IConfig{
	admin: string;
	permissions?: string[]
}