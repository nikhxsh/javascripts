import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableHeader, SortRequest, FilterRequest, PageRequest, SortOrder, SearchRequest } from './ngdatagrid.model';

@Component({
	selector: 'ngdatagrid',
	templateUrl: './ngdatagrid.component.html',
	styleUrls: ['./ngdatagrid.component.css']
})
export class NgDataGridComponent {

	filterSelected = false;
	currentPage: number = 1;
	firstPage: number = 1;
	lastPage: number = 1;
	searchToken: string;
	totalPages: number = 1;
	blinkRowId: string = '';
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
	@Input() enableAdd: boolean = false;
	@Input() enableEdit: boolean = false;
	@Input() enableDelete: boolean = false;
	@Input() loading: boolean = false;
	@Input() blinkRowOnSelect: boolean = false;
	@Input() firstPageText: string = "First";
	@Input() prevPageText: string = "Prev";
	@Input() nextPageText: string = "Next";
	@Input() lastPageText: string = "Last";

	@Output() onSort: EventEmitter<SortRequest> = new EventEmitter<SortRequest>();
	@Output() onSearch: EventEmitter<any> = new EventEmitter<any>();
	@Output() onFilter: EventEmitter<FilterRequest> = new EventEmitter<FilterRequest>();
	@Output() onPageChange: EventEmitter<PageRequest> = new EventEmitter<PageRequest>();
	@Output() onPageSizeChange: EventEmitter<PageRequest> = new EventEmitter<PageRequest>();
	@Output() onView: EventEmitter<any> = new EventEmitter<any>();
	@Output() onAdd: EventEmitter<any> = new EventEmitter<any>();
	@Output() onEdit: EventEmitter<any> = new EventEmitter<any>();
	@Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
	@Output() onReset: EventEmitter<any> = new EventEmitter<any>();

	constructor() {
	}

	sortClick(columName: string, i: number): void {
		let selectedHeader = this.headers.find(x => x.key === columName);
		selectedHeader.sort = (selectedHeader.sort + 1) % 3;

		this.headers.forEach(x => {
			if (x.key !== columName)
				x.sort = SortOrder.None;
		});

		let sortRequest = new SortRequest(columName, selectedHeader.sort);
		this.onSort.emit(sortRequest);
	}

	searchClick(token: string): void {
		this.resetPagination();
		let searchRequest = new SearchRequest(
			this.currentPage,
			this.itemsPerPage,
			token
		);
		this.onSearch.emit(searchRequest);
	}

	filterClick(i: number): void {
		this.resetPagination();
		let filterRequest = new FilterRequest(
			this.currentPage,
			this.itemsPerPage,
			this.headers[i].key,
			this.headers[i].filterToken
		);
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

	onAddClick(): void {
		this.onAdd.emit();
	}

	onEditClick(item: any): void {
		this.blinkRowId = item.id;
		this.onEdit.emit(item);
	}

	onDeleteClick(item: any): void {
		this.blinkRowId = item.id;
		this.onDelete.emit(item);
	}

	onResetClick(): void {
		this.currentPage = 1;
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

	disablePagination(flag: number = 0) {
		switch (flag) {
			case 1: return this.records && (this.records.length === 0 || this.currentPage === 1 || this.loading);
			case 2: return this.records && (this.records.length === 0 || this.currentPage === this.totalPages || this.loading);
			default: return this.loading;
		}
	}

	resetPagination(): void {
		this.pages = [];
		this.currentPage = 1;
		this.firstPage = 1;
		this.lastPage = 1;
		this.setPages(this.firstPage, this.lastPage);
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

		if (this.currentPage <= this.maxSize) {
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
