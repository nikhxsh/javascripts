export class TableHeader {
	key: string = ''
	enableView: boolean = false
	sortable: boolean = false
	filterable: boolean = false
	sort: SortOrder = SortOrder.None
	filterToken: string = ''
	width: number

	public constructor(init?: Partial<TableHeader>) {
		Object.assign(this, init);
	}
}

export enum SortOrder { None = 1, Asc, Desc }

export class SortRequest {
	column: string
	order: SortOrder
	constructor(
		column: string,
		order: SortOrder) {
		this.column = column;
		this.order = order;
	}
}

export class FilterRequest {
	column: string
	token: string
	constructor(
		column: string,
		token: string) {
		this.column = column;
		this.token = token;
	}
}

export class PageRequest {
	page: number
	size: number
	constructor(
		page: number = 1,
		size: number = 10) {
		this.page = page;
		this.size = size;
	}
}