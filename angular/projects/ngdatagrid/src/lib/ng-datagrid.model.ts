export class TableHeader {
	key: string = ''
	enableView: boolean = false
	sortable: boolean = false
	filterable: boolean = false
	sort: SortOrder = SortOrder.None
	filterToken: string = ''
	width: number = 0

	public constructor(init?: Partial<TableHeader>) {
		Object.assign(this, init);
	}
}

export enum SortOrder { None, Asc, Desc }

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

export class SearchRequest extends PageRequest {
	token: string
	constructor(
		page: number,
		size: number,
		token: string) {
		super(page, size);
		this.token = token;
	}
}

export class FilterRequest extends PageRequest {
	column: string
	token: string
	constructor(
		page: number,
		size: number,
		column: string,
		token: string) {
		super(page, size);
		this.column = column;
		this.token = token;
	}
}