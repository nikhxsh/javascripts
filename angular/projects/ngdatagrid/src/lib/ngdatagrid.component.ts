import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableHeader, SortRequest, FilterRequest, PageRequest, SortOrder } from './ngdatagrid.model';

@Component({
	selector: 'ngdatagrid',
	templateUrl: './ngdatagrid.component.html',
	styleUrls: ['./ngdatagrid.component.css']
})
export class NgDataGridComponent {

	filterSelected = false;
	currentPage: number = 1;
	firstPage: number = 1;
	lastPage: number;
	searchToken: string;
	totalPages: number = 1;
	pages: number[] = [];

	_totalItems: number;
	@Input()
	set totalItems(val: number) {
		this._totalItems = val;
		this.initPagination();
	}

	get totalItems(): number {
		return this._totalItems;
	}

	@Input() itemsPerPage: number = 10;
	@Input() maxSize: number = 10;
	@Input() headers: TableHeader[];
	@Input() records: any[] = [];
	@Input() enableEdit: boolean = false;
	@Input() enableDelete: boolean = false;
	@Input() loading: boolean = false;

	@Output() onSort: EventEmitter<SortRequest> = new EventEmitter<SortRequest>();
	@Output() onSearch: EventEmitter<any> = new EventEmitter<any>();
	@Output() onFilter: EventEmitter<FilterRequest> = new EventEmitter<FilterRequest>();
	@Output() onPageChange: EventEmitter<PageRequest> = new EventEmitter<PageRequest>();
	@Output() onPageSizeChange: EventEmitter<PageRequest> = new EventEmitter<PageRequest>();
	@Output() onView: EventEmitter<any> = new EventEmitter<any>();
	@Output() onEdit: EventEmitter<any> = new EventEmitter<any>();
	@Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
	@Output() onReset: EventEmitter<any> = new EventEmitter<any>();

	constructor() {
	}

	sortClick(columName: string, i: number): void {
		let selectedHeader = this.headers.find(x => x.key === columName);
		selectedHeader.sort = (selectedHeader.sort % 3) + 1;

		this.headers.forEach(x => {
			if (x.key !== columName)
				x.sort = SortOrder.None;
		});

		let sortRequest = new SortRequest(columName, selectedHeader.sort);
		this.onSort.emit(sortRequest);
	}

	searchClick(token: string): void {
		if (token.length > 0)
			this.onSearch.emit(token);
	}

	filterClick(i: number): void {
		let filterRequest = new FilterRequest(this.headers[i].key, this.headers[i].filterToken)
		this.onFilter.emit(filterRequest);
	}

	onPageChanged(): void {
		var pageRequest = new PageRequest(this.currentPage, this.itemsPerPage);
		this.onPageChange.emit(pageRequest);
	}

	onPageSizeChanged(Size: number): void {
		this.itemsPerPage = Size;
		this.initPagination();
		var pageRequest = new PageRequest(this.currentPage, this.itemsPerPage);
		this.onPageSizeChange.emit(pageRequest);
	}

	onViewClick(item: any): void {
		this.onView.emit(item);
	}

	onEditClick(item: any): void {
		this.onEdit.emit(item);
	}

	onDeleteClick(item: any): void {
		this.onDelete.emit(item);
	}

	onResetClick(): void {
		this.currentPage = 1;
		this.itemsPerPage = 10;
		this.searchToken = '';
		this.filterSelected = false;
		this.headers.map(x => x.filterToken = '');
		this.onReset.emit();
	}

	showLinkColumn(): boolean {
		return this.enableEdit || this.enableDelete;
	}

	isNotId(columName: string): boolean {
		return columName !== 'id';
	}

	viewEnabled(index: number): boolean {
		return this.headers[index - 1].enableView;
	}

	getColSpan(): number {
		let colspan = this.headers.length;
		if (this.showLinkColumn())
			colspan++;
		return colspan;
	}

	initPagination(): void {
		this.pages = [];
		this.currentPage = 1;
		this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
		this.firstPage = this.currentPage;
		this.lastPage = this.validateMaxSize();
		this.setPages(this.firstPage, this.lastPage);
	}

	setPages(min: number, max: number): void {
		this.pages = [];
		for (let i = min; i <= max && i <= this.totalPages; i++)
			this.pages.push(i);
	}

	onPageClick(page: number): void {
		this.currentPage = page;

		let median = Math.ceil(this.validateMaxSize() / 2) - 1;
		let min = this.currentPage - median;
		let max = this.currentPage + median + 1;

		if (min < 1) {
			min = 1;
			max = this.validateMaxSize();
		}
		else if (max > this.totalPages) {
			max = this.totalPages;
			min = (this.totalPages - this.validateMaxSize()) + 1;
		}

		this.firstPage = min;
		this.lastPage = max;

		this.onPageChanged();
		this.setPages(this.firstPage, this.lastPage);
	}

	onPreviousPageClick(prevPage: number): void {

		if (prevPage < 1)
			return;

		this.currentPage = prevPage;

		let max = this.lastPage;
		let min = (this.currentPage - this.validateMaxSize()) + (max - this.currentPage) + 1;

		if (this.firstPage > this.currentPage) {
			min = this.currentPage;
			max = (this.currentPage + this.validateMaxSize()) - 1;
			this.firstPage = min;
			this.lastPage = max;
		}

		this.firstPage = min;
		this.lastPage = max;

		this.onPageChanged();
		this.setPages(this.firstPage, this.lastPage);
	}

	onNextPageClick(nextPage: number): void {

		if (nextPage > this.totalPages)
			return;

		this.currentPage = nextPage;

		let min = this.firstPage;
		let max = (this.firstPage + this.validateMaxSize()) - 1;

		if (this.currentPage <= 10) {
			min = 1;
			max = this.validateMaxSize();
		}
		else if (max >= this.totalPages) {
			min = (this.totalPages - this.validateMaxSize()) + 1;
			max = this.totalPages;
		}
		else {
			min = (this.currentPage - this.validateMaxSize()) + 1;
			max = this.currentPage;
		}

		this.firstPage = min;
		this.lastPage = max;

		this.onPageChanged();
		this.setPages(this.firstPage, this.lastPage);
	}

	onFirstPageClick(): void {
		this.currentPage = 1;
		this.firstPage = this.currentPage;
		this.lastPage = (this.firstPage + this.validateMaxSize()) - 1;
		this.onPageChanged();
		this.setPages(this.firstPage, this.lastPage);
	}

	onLastPageClick(): void {
		this.currentPage = this.totalPages;
		this.firstPage = (this.currentPage - this.validateMaxSize()) + 1;
		this.lastPage = this.currentPage;
		this.onPageChanged();
		this.setPages(this.firstPage, this.lastPage);
	}

	validateMaxSize(): number {
		return this.maxSize > this.totalPages ? this.totalPages : this.maxSize;
	}
}
