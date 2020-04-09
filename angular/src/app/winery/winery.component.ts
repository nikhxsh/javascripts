import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { WineryService } from '../services/winery.service';
import { HandleError } from '../helpers/error.utility';
import { Sort, Filter, PagingRequest } from '../helpers/common.model';
import { Wine } from './winery.model';
import { TableHeader, SortOrder, PageRequest, SortRequest, FilterRequest } from 'ngdatagrid';
import { DatePipe, CurrencyPipe } from '@angular/common';

@Component({
	selector: 'app-winery',
	templateUrl: './winery.component.html',
	styleUrls: ['./winery.component.css']
})
export class WineryComponent implements OnInit {

	totalItems = 0;
	selectedDescription = '';
	refreshing = false;
	headers: TableHeader[] = [];

	wines: Wine[] = [];
	mappedWines: any[];
	modalRef: BsModalRef;

	request = new PagingRequest({
		take: 10,
		skip: 0,
		token: '',
		sort: new Sort("name"),
		filters: []
	});

	constructor(private wineryServiceRef: WineryService,
		private modalService: BsModalService,
		private datePipe: DatePipe,
		private currencyPipe: CurrencyPipe) { }

	ngOnInit() {
		this.headers = [
			new TableHeader({ key: 'Name', enableView: true, sortable: true, filterable: true, sort: SortOrder.Asc, width: 40 }),
			new TableHeader({ key: 'Vintage', sortable: true, sort: SortOrder.None, width: 10 }),
			new TableHeader({ key: 'Score' }),
			new TableHeader({ key: 'Price' }),
			new TableHeader({ key: 'Color' }),
			new TableHeader({ key: 'Year/Rank' }),
			new TableHeader({ key: 'Issue Date' })
		];
		this.getWineryInfo();
	}

	private getWineryInfo() {
		try {
			this.refreshing = true;
			this.wineryServiceRef.fecthAll(this.request)
				.subscribe(wineinfo => {
					this.refreshing = false;
					if (wineinfo) {
						this.wines = wineinfo.result;
						this.mappedWines = wineinfo.result.map(x => ({
							id: x.id,
							name: x.name,
							vintage: x.vintage,
							color: x.color,
							score: x.score,
							price: this.currencyPipe.transform(x.price, 'CAD', 'symbol-narrow'),
							yearAndRank: `${x.rankYear}/${x.rank}`,
							issueDate: this.datePipe.transform(x.issueDate, 'yyyy-MM-dd')
						}));
						this.totalItems = wineinfo.total;
					}
					else {
						this.mappedWines = [];
						this.totalItems = 0;
					}
				},
					error => {
						this.refreshing = false;
						HandleError.handle(error);
					});
		}
		catch (e) {
			HandleError.handle(e);
		}
	}

	public pageChanged(event: PageRequest) {
		this.request.skip = (event.page - 1) * event.size;
		this.request.take = event.size;
		this.getWineryInfo();
	}

	public search(token: string) {
		this.request.token = token.trim();
		this.getWineryInfo();
	}

	public sort(event: SortRequest) {
		this.request.sort.column = event.column;
		this.request.sort.order = event.order;
		this.getWineryInfo();
	}

	public filterRecord(event: FilterRequest) {

		var filter = this.request.filters.find(x => x.column === event.column);
		if (filter)
			filter.token = event.token;
		else
			this.request.filters.push(new Filter(event.column, event.token));

		this.getWineryInfo();
	}

	public updatePageSize(event: PageRequest) {
		this.request.skip = (event.page - 1) * event.size;
		this.request.take = event.size;
		this.getWineryInfo();
	}

	public resetAll() {
		this.request.filters = [];
		this.request.sort = new Sort("name");
		this.request.token = '';
		this.request.skip = 0;
		this.request.take = 10;
		this.getWineryInfo();
	}

	public openModal(template: TemplateRef<any>, flag, $event) {
		this.modalRef = this.modalService.show(template);

		switch (flag) {
			case 1:
				this.selectedDescription = this.wines.find(x => x.id === $event.id).note;
				break;

			case 2:
				this.selectedDescription = this.wines.find(x => x.id === $event.id).name;
				break;

			case 3:
				this.selectedDescription = this.wines.find(x => x.id === $event.id).name;
				break;

		}
	}
}
