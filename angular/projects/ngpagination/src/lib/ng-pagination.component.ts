import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Page } from './ng-pagination.model';

@Component({
	selector: 'pagination',
	templateUrl: './ng-pagination.component.html'
})
export class NgPaginationComponent implements OnInit {

	pageModel?: Page;
	pages: number[] = [];
	totalPages: number = 0;

	@Input() maxSize: number = 10;
	@Input() disable: boolean = false;
	@Input() pageListStyle: string = 'pagination justify-content-center';
	@Input() pageStyle: string = 'page-item';
	@Input() pageLinkStyle: string = 'page-link';
	@Input() firstPageText: string = "First";
	@Input() prevPageText: string = "Prev";
	@Input() nextPageText: string = "Next";
	@Input() lastPageText: string = "Last";

	_totalItems: number = 0;
	@Input()
	set totalItems(val: number) {
		this._totalItems = val;
		this.initPagination();
	}

	get totalItems(): number {
		return this._totalItems;
	}

	_itemsPerPage: number = 10;
	@Input()
	set itemsPerPage(val: number) {
		this._itemsPerPage = val;
		this.initPagination();
	}

	get itemsPerPage(): number {
		return this._itemsPerPage;
	}

	_reset: boolean = false;
	@Input()
	set reset(val: boolean) {
		this._reset = val;
		if (this._reset)
			this.initPagination();
	}

	get reset(): boolean {
		return this._reset;
	}

	@Output() onPageChanged: EventEmitter<Page> = new EventEmitter<Page>();

	constructor() { }

	ngOnInit() {
		this.initPagination();
	}

	initPagination(): void {
		this.pages = [];
		this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
		this.pageModel = new Page(1, 1, this.validateMaxSize());
		this.setPages();
	}

	setPages(): void {
		this.pages = [];
		for (let i = this.pageModel.firstPage; i <= this.pageModel.lastPage && i <= this.totalPages; i++)
			this.pages.push(i);
	}

	onPageClick(page: number): void {
		this.pageModel.currentPage = page;

		let median = Math.ceil(this.validateMaxSize() / 2) - 1;
		let min = this.pageModel.currentPage - median;
		let max = this.pageModel.currentPage + median + 1;

		if (min < 1) {
			min = 1;
			max = this.validateMaxSize();
		}
		else if (max > this.totalPages) {
			max = this.totalPages;
			min = (this.totalPages - this.validateMaxSize()) + 1;
		}

		this.pageModel.firstPage = min;
		this.pageModel.lastPage = max;

		this.onPageChanged.emit(this.pageModel);
		this.setPages();
	}

	onPreviousPageClick(prevPage: number): void {

		if (prevPage < 1)
			return;

		this.pageModel.currentPage = prevPage;

		let max = this.pageModel.lastPage;
		let min = (this.pageModel.currentPage - this.validateMaxSize()) + (max - this.pageModel.currentPage) + 1;

		if (this.pageModel.firstPage > this.pageModel.currentPage) {
			min = this.pageModel.currentPage;
			max = (this.pageModel.currentPage + this.validateMaxSize()) - 1;
			this.pageModel.firstPage = min;
			this.pageModel.lastPage = max;
		}

		this.pageModel.firstPage = min;
		this.pageModel.lastPage = max;

		this.onPageChanged.emit(this.pageModel);
		this.setPages();
	}

	onNextPageClick(nextPage: number): void {

		if (nextPage > this.totalPages)
			return;

		this.pageModel.currentPage = nextPage;

		let min = this.pageModel.firstPage;
		let max = (this.pageModel.firstPage + this.validateMaxSize()) - 1;

		if (this.pageModel.currentPage <= this.maxSize) {
			min = 1;
			max = this.validateMaxSize();
		}
		else if (max >= this.totalPages) {
			min = (this.totalPages - this.validateMaxSize()) + 1;
			max = this.totalPages;
		}
		else {
			min = (this.pageModel.currentPage - this.validateMaxSize()) + 1;
			max = this.pageModel.currentPage;
		}

		this.pageModel.firstPage = min;
		this.pageModel.lastPage = max;

		this.onPageChanged.emit(this.pageModel);
		this.setPages();
	}

	onFirstPageClick(): void {
		this.pageModel.currentPage = 1;
		this.pageModel.firstPage = this.pageModel.currentPage;
		this.pageModel.lastPage = (this.pageModel.firstPage + this.validateMaxSize()) - 1;
		this.onPageChanged.emit(this.pageModel);
		this.setPages();
	}

	onLastPageClick(): void {
		this.pageModel.currentPage = this.totalPages;
		this.pageModel.firstPage = (this.pageModel.currentPage - this.validateMaxSize()) + 1;
		this.pageModel.lastPage = this.pageModel.currentPage;
		this.onPageChanged.emit(this.pageModel);
		this.setPages();
	}

	validateMaxSize(): number {
		return this.maxSize > this.totalPages ? this.totalPages : this.maxSize;
	}

	disablePagination(flag: number = 0): boolean {
		switch (flag) {
			case 1: return this.totalItems <= 0 || this.pageModel.currentPage === 1 || this.disable;
			case 2: return this.totalItems <= 0 || this.pageModel.currentPage === this.totalPages || this.disable;
			default: return this.disable;
		}
	}
}
