import { Component, OnInit } from '@angular/core';
import { SimpleService } from './simple.service';
import { SearchService } from './search.service';
import { SearchItem } from './searchitem';
import { FormControl } from '@angular/forms';
import {  distinctUntilChanged, debounceTime, tap, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-holder',
  templateUrl: './holder.component.html'
})
export class HolderComponent implements OnInit {
  response: any;
  results: SearchItem[];
  results1: Observable<SearchItem[]>;
  searchField: FormControl;
  loading: boolean = false;

  constructor(private service: SimpleService, private itunes: SearchService) { }

  ngOnInit() {
    this.searchField = new FormControl();
    this.results1 = this.searchField.valueChanges
      .pipe(
        //Emits a value from the source Observable only after a particular time span has passed without 
        //another source emission.
        debounceTime(400),
        //Returns an Observable that emits all items emitted by the source Observable that are distinct 
        //by comparison from the previous item.
        distinctUntilChanged(),
        //Perform a side effect for every emission on the source Observable, but return an Observable that 
        //is identical to the source.
        tap(() => this.loading = true),
        //Projects each source value to an Observable which is merged in the output Observable, emitting values 
        //only from the most recently projected Observable.
        switchMap(term => this.itunes.find(term)),
        tap(() => this.loading = false)
      );
  }

  doSearch(term: string) {
    this.itunes.search(term, 'music', '10')
      .subscribe(
        res => {
          this.results = res.map(element => {
            return new SearchItem(
              element.trackName,
              element.artistName,
              element.artworkUrl100,
              element.collectionName,
              element.collectionViewUrl,
              element.country
            )
          });
        },
        msg => {
          // Error
        }
      )
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
