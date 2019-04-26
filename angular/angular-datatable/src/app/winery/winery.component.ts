import { Component, OnInit, TemplateRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { WineryService } from '../winery.service';
import { HandleError } from "../../helpers/error.utility";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { TableHeader, SortOrder, PageRequest, SortRequest, FilterRequest } from 'angular-custom-datatable';

import { ProcessList } from '../../helpers/extension.utility';
import { PagingRequest, Sort, Filter } from '../../models/common.model';
import { Wine } from '../../models/winery.model';

@Component({
	selector: 'app-winery',
	templateUrl: './winery.component.html',
	styleUrls: ['./winery.component.css']
})
export class WineryComponent implements OnInit {

	totalItems = 0;
	take = 10;
	skip = 0;
	token = '';
	selectedDescription = '';
	refreshing = false;
	headers: TableHeader[] = [];

	sortRequest: Sort;
	filterRequest: Filter[];
	lstWines: Wine[];
	mappedWines: any[];
	modalRef: BsModalRef;

	constructor(private wineryServiceRef: WineryService,
		private modalService: BsModalService,
		private datePipe: DatePipe) { }

	ngOnInit() {

		this.filterRequest = [];
		this.sortRequest = new Sort('name');

		this.headers = [
			new TableHeader({ key: 'Id', sortable: true, filterable: true, sort: SortOrder.None, width: 7 }),
			new TableHeader({ key: 'Name', sortable: true, filterable: true, sort: SortOrder.None, width: 30 }),
			new TableHeader({ key: 'Vintage', width: 5 }),
			new TableHeader({ key: 'Color' }),
			new TableHeader({ key: 'Country' }),
			new TableHeader({ key: 'Region' }),
			new TableHeader({ key: 'Score' }),
			new TableHeader({ key: 'Price' }),
			new TableHeader({ key: 'Year/Rank' }),
			new TableHeader({ key: 'Issue Date' })
		];
		this.getWineryInfo();
	}

	private getWineryInfo() {
		try {

			let body = new PagingRequest({
				take: this.take,
				skip: this.skip,
				token: this.token,
				sort: this.sortRequest,
				filters: this.filterRequest
			});

			this.refreshing = true;
			this.wineryServiceRef._getAll()
				.subscribe(result => {

					this.refreshing = false;

					if (result) {
						var processedResult = ProcessList(result, body);
						this.lstWines = processedResult.wines;
						this.mappedWines = this.lstWines.map(x => {
							let any = {
								id: x.id,
								winery_full: x.wine_full,
								vintage: x.vintage,
								color: x.color,
								country: x.country,
								region: x.region,
								score: x.score,
								price: x.price,
								top100_year_rank: `${x.top100_year}/${x.top100_rank}`,
								issue_date: x.issue_date,
							};
							return any;
						});

						this.totalItems = processedResult.total;
					}
					else {
						this.lstWines = [];
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

	private pageChanged(event: PageRequest) {
		this.skip = (event.page - 1) * event.size;
		this.take = event.size;
		this.getWineryInfo();
	}

	private search(token: string) {
		this.token = token.trim();
		this.getWineryInfo();
	}

	private sort(event: SortRequest) {
		this.sortRequest.column = event.column;
		this.sortRequest.order = event.order;
		this.getWineryInfo();
	}

	private filterRecord(event: FilterRequest) {

		var filter = this.filterRequest.find(x => x.column === event.column);
		if (filter)
			filter.token = event.token;
		else
			this.filterRequest.push(new Filter(event.column, event.token));

		this.getWineryInfo();
	}

	private updatePageSize(event: PageRequest) {
		this.skip = (event.page - 1) * event.size;
		this.take = event.size;
		this.getWineryInfo();
	}

	private resetAll() {
		this.filterRequest = [];
		this.sortRequest = new Sort("");
		this.token = "";
		this.skip = 0;
		this.take = 10;
		this.getWineryInfo();
	}

	private openModal(template: TemplateRef<any>, flag, $event) {
		this.modalRef = this.modalService.show(template);

		switch (flag) {
			case 1:
				this.selectedDescription = this.lstWines.find(x => x.id === $event.id).note;
				break;

			case 2:
				this.selectedDescription = this.lstWines.find(x => x.id === $event.id).wine_full;
				break;

			case 3:
				this.selectedDescription = this.lstWines.find(x => x.id === $event.id).wine_full;
				break;

		}
	}

}
