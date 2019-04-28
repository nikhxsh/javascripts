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

/**
 * NgModule.providers
 * > In this configuration the service has been injected onto our applications root NgModule and therefore
 *   is in our root injector.So every request to resolve and inject the token SimpleService is going to be
 *   forwarded to our single root injector.
 * > So when you type anything it will reflect all over on holder component page
 * > If we want to share one instance of a service across the entirety of our application we configure it on
 *   our NgModule.
 *
 * Component.providers
 * > Let’s now see what happens when we configure our SimpleService additionally on th ParentComponent via the
 * providers property.
 * > We can see from the running the code above that if we type into one parent component only that
 * parent component and it’s child component automatically updates, like so:
 * > Each instance of ParentComponent now has it’s own instance of SimpleService, Remember when we request the same token from different
 * injectors we get the different instances.
 *
 * Component.viewProviders
 * > If we now configure the SimpleService provider on the viewProviders property on the ParentComponent nothing changes,
 * > But lets use content projection and the ng-content component to change the child component from being a view child of parent
 * to the being a content child of parent
 * > We use content projection to insert the ChildComponent where it used to be hard coded.
 * > change the configuration of ParentComponent to use viewProviders instead.
 * > Now when we type into the ParentComponent the child component doesn’t update automatically
 * > That’s because when using viewProviders the component creates an injector which is only used by the current component and any view children.
 * > If you are a content child, as our child component now is, then it uses the injector in NgModule to resolve the dependency.
 */
