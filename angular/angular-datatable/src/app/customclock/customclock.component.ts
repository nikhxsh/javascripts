import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'custom-clock',
  template: `<div>{{ time | async | date: 'medium' }}</div>`
})
export class CustomclockComponent {

  time: Observable<string>;

  constructor() { 
    this.time = Observable.interval(1000).map(tick => new Date().toLocaleString()).share();
  }
}
  