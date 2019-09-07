import { Component, OnInit } from '@angular/core';
import { SimpleService } from '../services/simple.service';

@Component({
  selector: 'app-holder',
  templateUrl: './holder.component.html'
})
export class HolderComponent implements OnInit {
  response: any;

  constructor(private service: SimpleService) { }

  ngOnInit() {
  }

  doGET() {
    this.service.doGET()
      .subscribe(res => this.response = res);
  }

  doPOST() {
    this.service.doPOST()
      .subscribe(res => this.response = res);
  }

  doPUT() {
    this.service.doPUT()
      .subscribe(res => this.response = res);
  }

  doDELETE() {
    this.service.doDELETE()
      .subscribe(res => this.response = res);
  }

  doGETAsPromise() {
    this.service.doGETAsPromise()
      .then(res => this.response = res);
  }

  doGETAsPromiseError() {
    this.service.doGETAsPromiseError()
      .then(
        res => this.response = res,
        msg => this.response = `Promise >> Error: ${msg.status} ${msg.statusText}`);
  }

  doGETAsObservableError() {
    this.service.doGETAsObservableError()
      .subscribe(
        res => this.response = res,
        msg => this.response = `Observable >> Error: ${msg.status} ${msg.statusText}`);
  }

  doGETWithHeaders() {
    this.service.doGETWithHeaders()
      .subscribe(res => this.response = res);
  }
}
