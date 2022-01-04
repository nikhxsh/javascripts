import { Component, OnInit } from '@angular/core';
import { TableHeader, SortOrder, PageRequest, SortRequest, FilterRequest, SearchRequest } from 'ngdatagrid';
import { PagingRequest, Sort, Filter } from '../helpers/common.model';
import { WineryService } from '../services/winery.service';

@Component({
	selector: 'datagrid-package',
	templateUrl: './datagrid-package.component.html'
})
export class DataGridPackageComponent implements OnInit {

	totalItems = 0;
	selectedDescription = '';

	tableStyle = 'table table-bordered';
	pageListStyle = 'pagination justify-content-center';
	pageStyle = 'page-item';
	pageLinkStyle = 'page-link';
	buttonStyle = 'btn';
	buttonGroupStyle = 'btn-group';
	dropDownStyle = 'btn dropdown-toggle';
	inputStyle = 'form-control';

	refreshing = false;
	headers: TableHeader[] = [];
	blinkrow: boolean = true;
	resetForm: boolean = false;
	data: any[] = [];

	request = new PagingRequest({
		skip: 0,
		take: 10,
		token: '',
		sort: new Sort("name"),
		filters: []
	});

	constructor(private service: WineryService) { }

	ngOnInit() {
		this.headers = [
			new TableHeader({
				key: '#',
				width: 5
			}),
			new TableHeader({
				key: 'Name',
				enableView: true,
				sortable: true,
				filterable: true,
				sort: SortOrder.Asc
			}),
			new TableHeader({
				key: 'vintage',
				sortable: true,
				sort: SortOrder.None,
				filterable: true,
				width: 20
			})
		];

		this.getData();
	}

	private getData() {
		try {
			this.refreshing = true;
			this.service.fecthAll(this.request)
				.subscribe(response => {
					this.refreshing = false;
					if (response) {
						this.data = response.result.map((item, index) => ({
							id: item.id,
							index: this.request.skip + index + 1,
							name: item.name,
							vintage: item.vintage
						}));

						this.totalItems = response.total;

						if (response.total > response.filteredTotal)
							this.totalItems = response.filteredTotal;
					}
					else {
						this.data = [];
						this.totalItems = 0;
					}
				}, error => {
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
		this.request.skip = 0;
		this.request.take = 10;
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

	public customeMethod(event: any){
		//Implementation
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