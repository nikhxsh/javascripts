import { Component, OnInit } from '@angular/core';
import { SimpleService } from '../services/simple.service';

@Component({
	selector: 'child',
	templateUrl: './child.component.html'
})
export class ChildComponent implements OnInit {
	constructor(public service: SimpleService) { }

	ngOnInit() {
	}
}
