import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'basic',
  templateUrl: './basic.component.html'
})
export class BasicComponent implements OnInit {
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
  constructor() { }

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
}
