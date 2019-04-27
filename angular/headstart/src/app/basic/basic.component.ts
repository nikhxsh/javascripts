import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'basic',
  templateUrl: './basic.component.html'
})
export class BasicComponent implements OnInit {
  private dateVal: Date = new Date();
  private jsonVal: Object = { moo: 'foo', goo: { too: 'new' } };
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

  constructor() {
    this.promise = this.getPromise();
    this.observable = this.getObservable();
  }

  ngOnInit() {
  }

  getColor(country) {
    switch (country) {
      case 'UK':
        return 'green';
      case 'USA':
        return 'blue';
      case 'HK':
        return 'red';
    }
  }

  getObservable() {
    return interval(1000)
      .pipe(
        take(100),
        map((v) => v * v)
      );
  }

  getPromise() : Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve("Promise complete!"), 3000);
    });
  }
}
