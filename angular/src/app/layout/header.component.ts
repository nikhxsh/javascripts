import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'ui-header',
	templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {

	title = 'Angular Headstart';
	constructor() { }

	ngOnInit() {
	}
}
