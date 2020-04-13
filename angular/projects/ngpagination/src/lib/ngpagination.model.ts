export class Page {
	currentPage: number;
	firstPage: number;
	lastPage: number

	constructor(current: number = 0, first: number = 0, last: number = 0) {
		this.currentPage = current;
		this.firstPage = first;
		this.lastPage = last;
	}
}