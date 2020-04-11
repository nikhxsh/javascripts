export class PagingRequest {
	take: number = 10
	skip: number = 0
	token: string = ''
	sort: Sort = undefined
	filters: Filter[] = []

	//1. Using Partial<PagingRequest> makes every parameter optional
	//2. you'd probably be better off defining anything that has a default as optional in the class itself, but assign a default. 
	//   Then don't use Partial<>, just PagingRequest - that will require you to pass an object that has the required fields
	public constructor(init?: Partial<PagingRequest>) {
		Object.assign(this, init);
	}
}

export class Sort {
	column: string
	order: SortOrder

	constructor(
		column: string,
		order: SortOrder = SortOrder.None) {
		this.column = column
		this.order = order
	}
}

export class Filter {
	column: string
	token: string

	constructor(
		column: string,
		token: string) {
		this.column = column
		this.token = token
	}
}

export enum SortOrder { None, Asc, Desc }