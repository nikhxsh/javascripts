import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { SortRequest, SortOrder, FilterRequest, DataTableHeader, PageRequest } from './datatable.model';

@Component({
  moduleId: module.id,
  selector: 'datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {

  @Input() pageSize: number = 10;
  @Input() totalItems: number;
  @Input() headers: DataTableHeader[];
  @Input() records: any[] = [];
  @Input() showLinks: boolean = false;


  @Output() onSort: EventEmitter<SortRequest> = new EventEmitter<SortRequest>();
  @Output() onSearch: EventEmitter<any> = new EventEmitter<any>();
  @Output() onFilter: EventEmitter<FilterRequest> = new EventEmitter<FilterRequest>();
  @Output() onPageChange: EventEmitter<PageRequest> = new EventEmitter<PageRequest>();
  @Output() onPageSizeChange: EventEmitter<PageRequest> = new EventEmitter<PageRequest>();
  @Output() onView: EventEmitter<any> = new EventEmitter<any>();
  @Output() onEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() onReset: EventEmitter<any> = new EventEmitter<any>();

  toggleSortOrder = false;
  filterSelected = false;
  currentPage: number = 1;
  searchToken: string;

  constructor() { }

  ngOnInit() {
  }

  sortClick(columName: string, i: number) {
    let sortRequest = new SortRequest(columName, this.toggleSortOrder ? SortOrder.Desc : SortOrder.Asc);

    this.headers.forEach(element => {
      if (element.key === columName && this.toggleSortOrder)
        element.sort = SortOrder.Desc;
      else if (element.key === columName && !this.toggleSortOrder)
        element.sort = SortOrder.Asc;
      else
        element.sort = SortOrder.None;
    });

    this.onSort.emit(sortRequest);
    this.toggleSortOrder = !this.toggleSortOrder;
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
    this.headers.forEach(element => {
      element.filterToken = '';
    });
    this.onReset.emit();
  }
}
