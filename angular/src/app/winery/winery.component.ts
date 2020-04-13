import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { WineryService } from '../services/winery.service';
import { HandleError } from '../helpers/error.utility';
import { Sort, Filter, PagingRequest } from '../helpers/common.model';
import { Wine, Type } from './winery.model';
import { TableHeader, SortOrder, PageRequest, SortRequest, FilterRequest, SearchRequest } from 'ngdatagrid';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { FormField, FieldType, DropDown } from 'ngmodelform';
import { FormControl, Validators } from '@angular/forms';

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
	blinkrow: boolean = true;
	resetForm: boolean = false;
	wines: Wine[] = [];
	mappedWines: any[];

	modalRef: BsModalRef;
	modelFormFields: FormField[] = []

	request = new PagingRequest({
		skip: 0,
		take: 10,
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
			new TableHeader({ key: 'Color', sortable: true, sort: SortOrder.None, filterable: true }),
			new TableHeader({ key: 'Price', sortable: true, sort: SortOrder.None, filterable: true }),
			new TableHeader({ key: 'Vintage' }),
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
							color: Type[x.color],
							price: this.currencyPipe.transform(x.price, 'CAD', 'symbol-narrow'),
							vintage: x.vintage,
							issueDate: this.datePipe.transform(x.issueDate, 'yyyy-MM-dd')
						}));
						this.totalItems = wineinfo.total;

						if (wineinfo.total > wineinfo.filteredTotal)
							this.totalItems = wineinfo.filteredTotal;
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
		this.setSkipTake(event);
		this.getWineryInfo();
	}

	public sort(event: SortRequest) {
		this.request.sort.column = event.column;
		this.request.sort.order = event.order;
		this.getWineryInfo();
	}

	public search(event: SearchRequest) {
		this.setSkipTake(event);
		this.request.token = event.token.trim();
		this.getWineryInfo();
	}

	public filterRecord(event: FilterRequest) {
		this.setSkipTake(event);
		var filter = this.request.filters.find(x => x.column === event.column);
		if (filter)
			filter.token = event.token;
		else
			this.request.filters.push(new Filter(event.column, event.token));

		this.getWineryInfo();
	}

	public updatePageSize(event: PageRequest) {
		this.setSkipTake(event);
		this.getWineryInfo();
	}

	public setSkipTake(event: any) {
		this.request.skip = (event.page - 1) * event.size;
		this.request.take = event.size;
	}

	public resetAll() {
		this.request.filters = [];
		this.request.sort = new Sort("name");
		this.request.token = '';
		this.request.skip = 0;
		this.request.take = 10;
		this.getWineryInfo();
	}

	public onFormSubmit(event: any) {
		console.log(event);
	}

	public openModal(template: TemplateRef<any>, flag, $event) {
		this.resetForm = false;
		this.modalRef = this.modalService.show(template);
		switch (flag) {
			case 1:
				this.selectedDescription = $event.note;
				break;

			case 2:
				this.blinkrow = true;
				this.sendForm($event.id);
				break;

			case 3:
				this.blinkrow = true;
				this.selectedDescription = $event.name;
				break;

		}
	}

	sendForm(id: string): void {
		let wine = this.wines.find(x => x.id === id);
		let wineTypes = this.getWineTypes();
		this.modelFormFields = [
			new FormField("Name", "name", new FormControl(wine.name, Validators.required), FieldType.Text),
			new DropDown("Color", "color", new FormControl(wineTypes[wine.color], Validators.required), wineTypes),
			new FormField("Price", "price", new FormControl(wine.price, Validators.required), FieldType.Text),
			new FormField("Vintage", "vintage", new FormControl(wine.vintage, Validators.required), FieldType.Text)
		];
	}

	public closeModal() {
		this.modalRef.hide();
		this.blinkrow = false;
		this.resetForm = true;
	}

	private getWineTypes() {
		let types: string[] = [];
		for (var n in Type) {
			if (typeof Type[n] === 'number') types.push(n);
		}
		return types;
	}
}
