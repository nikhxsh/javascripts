import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableHeader, SortRequest, FilterRequest, PageRequest, SortOrder } from './ngdatagrid.model';
import { PageChangedEvent } from "ngx-bootstrap/pagination";

@Component({
	selector: 'ngdatagrid',
	templateUrl: './ngdatagrid.component.html',
	styleUrls: ['./ngdatagrid.component.css']
})
export class NgDataGridComponent implements OnInit {

	@Input() pageSize: number = 10;
	@Input() totalItems: number;
	@Input() headers: TableHeader[];
	@Input() records: any[] = [];
	@Input() enableEdit: boolean = false;
	@Input() enableDelete: boolean = false;

	@Output() onSort: EventEmitter<SortRequest> = new EventEmitter<SortRequest>();
	@Output() onSearch: EventEmitter<any> = new EventEmitter<any>();
	@Output() onFilter: EventEmitter<FilterRequest> = new EventEmitter<FilterRequest>();
	@Output() onPageChange: EventEmitter<PageRequest> = new EventEmitter<PageRequest>();
	@Output() onPageSizeChange: EventEmitter<PageRequest> = new EventEmitter<PageRequest>();
	@Output() onView: EventEmitter<any> = new EventEmitter<any>();
	@Output() onEdit: EventEmitter<any> = new EventEmitter<any>();
	@Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
	@Output() onReset: EventEmitter<any> = new EventEmitter<any>();

	filterSelected = false;
	currentPage: number = 1;
	searchToken: string;

	constructor() { }

	ngOnInit() {
	}

	sortClick(columName: string, i: number) {
		let selectedHeader = this.headers.find(x => x.key === columName);
		selectedHeader.sort = (selectedHeader.sort % 3) + 1;

		this.headers.forEach(x => {
			if (x.key !== columName)
				x.sort = SortOrder.None;
		});

		let sortRequest = new SortRequest(columName, selectedHeader.sort);
		this.onSort.emit(sortRequest);
	}

	searchClick(token: string) {
		if (token.length > 0)
			this.onSearch.emit(token);
	}

	filterClick(i: number) {
		let filterRequest = new FilterRequest(this.headers[i].key, this.headers[i].filterToken)
		this.onFilter.emit(filterRequest);
	}

	onPageChanged(event: PageChangedEvent): void {
		this.currentPage = event.page;
		var pageRequest = new PageRequest(this.currentPage, this.pageSize);
		this.onPageChange.emit(pageRequest);
	}

	onPageSizeChanged(Size: number): void {
		this.pageSize = Size;
		var pageRequest = new PageRequest(this.currentPage, this.pageSize);
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

	onResetClick() {
		this.currentPage = 1;
		this.pageSize = 10;
		this.searchToken = '';
		this.filterSelected = false;
		this.headers.map(x => x.filterToken = '');
		this.onReset.emit();
	}

	showLinkColumn() {
		return this.enableEdit || this.enableDelete;
	}

	isNotId(columName: string) {
		return columName !== 'id';
	}

	viewEnabled(index: number) {
		return this.headers[index - 1].enableView;
	}
}
