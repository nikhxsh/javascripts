import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableHeader, SortRequest, FilterRequest, PageRequest, SortOrder, SearchRequest } from './ng-data-grid.model';
import { Page } from '@nikxsh/ngpagination';

@Component({
	selector: 'data-grid',
	templateUrl: './ng-data-grid.component.html',
	styleUrls: ['./ng-data-grid.component.css']
})
export class NgDataGridComponent {

	filterSelected = false;
	searchToken: string;
	blinkRowId: string = '';
	initPagination: boolean;
	resetPagination: boolean;

	@Input() totalItems: number = 0;
	@Input() maxSize: number = 10;
	@Input() itemsPerPage: number = 10;

	@Input() headers: TableHeader[];
	@Input() records: any[] = [];

	@Input() enableAdd: boolean = false;
	@Input() enableEdit: boolean = false;
	@Input() enableDelete: boolean = false;
	@Input() loading: boolean = false;
	@Input() blinkRowOnSelect: boolean = false;

	@Input() tableStyle: string = 'table table-sm';
	@Input() buttonStyle: string = 'btn btn-sm btn-light';
	@Input() buttonGroupStyle: string = 'btn-group mr-2';
	@Input() dropDownStyle: string = 'btn btn-sm btn-light dropdown-toggle';
	@Input() inputStyle: string = 'form-control form-control-sm';
	@Input() pageListStyle: string = 'pagination justify-content-center';
	@Input() pageStyle: string = 'page-item';
	@Input() pageLinkStyle: string = 'page-link';

	@Input() firstPageText: string;
	@Input() prevPageText: string;
	@Input() nextPageText: string;
	@Input() lastPageText: string;

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

	onPageSizeChanged(Size: number): void {
		this.resetPagination = false;
		this.itemsPerPage = Size;
		var pageRequest = new PageRequest(1, this.itemsPerPage);
		this.onPageSizeChange.emit(pageRequest);
	}

	onPageChanged(event: Page): void {
		this.resetPagination = false;
		var pageRequest = new PageRequest(event.currentPage, this.itemsPerPage);
		this.onPageChange.emit(pageRequest);
	}

	sortClick(columName: string): void {
		this.resetPagination = true;
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
		let searchRequest = new SearchRequest(
			1,
			this.itemsPerPage,
			token
		);
		this.onSearch.emit(searchRequest);
	}

	filterClick(i: number): void {
		let filterRequest = new FilterRequest(
			1,
			this.itemsPerPage,
			this.headers[i].key,
			this.headers[i].filterToken
		);
		this.onFilter.emit(filterRequest);
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
		this.resetPagination = true;
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
}
