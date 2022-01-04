import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'basic',
	templateUrl: './basic.component.html'
})
export class BasicComponent implements OnInit {
	dateVal: Date = new Date();
	jsonVal: Object = { moo: 'foo', goo: { too: 'new' } };
	imageUrl: "";
	promise: Promise<string>;
	observable: Observable<number>;
	people: any[] = [
		{
			"name": "Douglas Pace",
			"age": 35,
			"country": 'UK'
		},
		{
			"name": "Mcleod Mueller",
			"age": 32,
			"country": 'USA'
		},
		{
			"name": "Day Meyers",
			"age": 21,
			"country": 'HK'
		},
		{
			"name": "Aguirre Ellis",
			"age": 34,
			"country": 'IN'
		},
		{
			"name": "Cook Tyson",
			"age": 32,
			"country": 'UA'
		}
	];

	peopleByCountry: any[] = [
		{
			'country': 'UK',
			'people': [
				{
					"name": "Douglas Pace"
				},
				{
					"name": "Mcleod Mueller"
				},
			]
		},
		{
			'country': 'US',
			'people': [
				{
					"name": "Day Meyers"
				},
				{
					"name": "Aguirre Ellis"
				},
				{
					"name": "Cook Tyson"
				}
			]
		}
	];

	constructor(private router: Router, private route: ActivatedRoute) {
		this.promise = this.getPromise();
		this.observable = this.getObservable();
		this.route.params.subscribe(params => console.log(params));
	}

	ngOnInit() {
	}

	getColor(country: any) {
		switch (country) {
			case 'UK':
				return 'green';
			case 'USA':
				return 'blue';
			case 'HK':
				return 'red';
			default:
				return '';
		}
	}

	getObservable() {
		return interval(1000)
			.pipe(
				take(100),
				map((v) => v * v)
			);
	}

	getPromise(): Promise<string> {
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve("Promise complete!"), 3000);
		});
	}

	goJokes() {
		this.router.navigate(['jokes']);
	}

	goJokesbyparams(term: string) {
		this.router.navigate(['jokes', { term: term }]);
	}

	goForms() {
		this.router.navigate(['forms']);
	}

	goUnknow() {
		this.router.navigate(['a', 'b', 'c']);
	}
}
