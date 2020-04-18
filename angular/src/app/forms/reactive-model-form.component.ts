import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
	selector: 'reactive-model-form',
	templateUrl: './reactive-model-form.component.html'
})
export class ReactivemodelformComponent implements OnInit {
	searchField: FormControl;
	searches: string[] = [];
	/**
	 * Both FormControls and FormGroups expose an observable called valuesChanged
	 * By subscribing to this observable we can react in real-time to changing values of an individual form 
	 * control, or a group of form controls.
	 */
	constructor() { }

	ngOnInit() {
		this.searchField = new FormControl();
		this.searchField.valueChanges
			.pipe(
				debounceTime(400),
				/**
				 * debounceTime takes as a first parameter a number of milliseconds, it will then only publish to the
				 * output stream if there has been no more input for that number of milliseconds.
				 */
				distinctUntilChanged()
				/**
				 * Ideally we only want to make the API call if the search term has changed. Like before there is an
				 * operator with RxJS we can use called distinctUntilChanged which only publishes to its output
				 * stream if the value being published is different from before.
				 */
			)
			.subscribe(term => {
				this.searches.push(term);
			});
	}

}
