# Angular Custom Data Table Module

This package is useful to implement data table with default bootstrap design but addon angular support. 

It also support Sorting, Search, Filter, Pagination & custom pagesize change, along with conditional way to display Add, Edit and delete buttons

#### Angular Template file (e.g. app.component.html)
1. Import `NgDataGridModule` in your `app.module`
2. Add below mentioned selector tag in your `component's html template`

```html
<ngdatagrid 
	[totalItems]="totalItems" 
	[maxSize]="10" 
	[itemsPerPage]="request.take" 
	[records]="data"
	[headers]="headers" 
	[enableAdd]="true" 
	[enableEdit]="true" 
	[enableDelete]="true" 
	[loading]="refreshing"
	[blinkRowOnSelect]="blinkrow" 
	(onPageChange)="pageChanged($event)"
	(onPageSizeChange)="updatePageSize($event)"
	(onSearch)="search($event)" 
	(onSort)="sort($event)" 
	(onFilter)="filterRecord($event)" 
	(onReset)="resetAll()"
	(onAdd)="yourMethod()" 
	(onView)="yourMethod($event)"
	(onEdit)="yourMethod($event)"
	(onDelete)="yourMethod($event)">
</ngdatagrid>
```
#### Angular Component (e.g. app.component.ts)
```javascript
import { Component, OnInit, TemplateRef } from '@angular/core';
import { TableHeader, SortOrder, PageRequest, SortRequest, FilterRequest, SearchRequest } from '@nikxsh/ngdatagrid';

@Component({
	selector: 'app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	totalItems = 0;
	selectedDescription = '';
	refreshing = false;
	headers: TableHeader[] = [];
	blinkrow: boolean = true;
	resetForm: boolean = false;
	data: [] = [];

	request = new PagingRequest({
		skip: 0,
		take: 10,
		token: '',
		sort: new Sort("name"),
		filters: []
	});

	constructor(private appService: AppService) { }

	ngOnInit() {
		this.headers = [
			new TableHeader({
				key: 'Id', 
				enableView: true, 
				sortable: true, 
				filterable: true, 
				sort: SortOrder.Asc, 
				width: 40
			}),
			new TableHeader({ 
				key: 'Name', 
				sortable: true, 
				sort: SortOrder.None, 
				filterable: true 
			})
		];

		this.getData();
	}

	private getData() {
		try {
			this.refreshing = true;
			this.appService.get(this.request)
				.subscribe(result; => {
						this.refreshing = false;
						this.data =  result.map(item => {
							idx = x.id,  //Attribute "id" will not be shown, so try  "idx" to display id 
							name = x.name
						});
					}
					else {
						this.data = [];
						this.totalItems = 0;
					}
				},
				error => {
					this.refreshing = false;
				});
		}
		catch (e) {
		}
	}

	public pageChanged(event: PageRequest) {
		this.setSkipTake(event);
		this.getData();
	}

	public sort(event: SortRequest) {
		this.request.sort.column = event.column;
		this.request.sort.order = event.order;
		this.getData();
	}

	public search(event: SearchRequest) {
		this.setSkipTake(event);
		this.request.token = event.token.trim();
		this.getData();
	}

	public filterRecord(event: FilterRequest) {
		this.setSkipTake(event);
		var filter = this.request.filters.find(x => x.column === event.column);
		if (filter)
			filter.token = event.token;
		else
			this.request.filters.push(new Filter(event.column, event.token));

		this.getData();
	}

	public updatePageSize(event: PageRequest) {
		this.setSkipTake(event);
		this.getData();
	}

	public setSkipTake(event: any) {
		this.request.skip = (event.page - 1) * event.size;
		this.request.take = event.size;
	}

	public resetAll() {
		this.request.filters = [];
		this.request.sort = new Sort("Id");
		this.request.token = '';
		this.request.skip = 0;
		this.request.take = 10;
		this.getData();
	}
}
```

#### UI
![](https://github.com/nikxsh/javascripts/blob/master/files/ngdatagrid.JPG?raw=true)