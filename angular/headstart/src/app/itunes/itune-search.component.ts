import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { SearchItem } from './searchitem';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { SearchService } from '../services/search.service';
import { debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'itune-search',
  templateUrl: './itune-search.component.html'
})
export class ItuneSearchComponent implements OnInit, OnDestroy {
  staticResult: SearchItem[];
  dynamicResult: Observable<SearchItem[]>;
  searchField: FormControl;
  loading: boolean = false;
  searchTerm: string;

  @ViewChild('artist') public artistSection: ElementRef;

  constructor(private itunes: SearchService,
    private route: ActivatedRoute) {
    this.intialise();
    this.route.params.subscribe(params => {
      this.searchTerm = params['term'];
      this.staticSearch();
    })
  }

  ngOnInit() {
  }

  intialise() {
    this.searchField = new FormControl();
    this.dynamicResult = this.searchField.valueChanges
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
        switchMap(term => this.itunes.search1(term)),
        //switchMap(term => this.itunes.search2(term)), //jsonp request
        tap(() => this.loading = false)
      );
  }

  staticSearch() {
    this.itunes.search3(this.searchTerm)
      .subscribe(
        res => {
          this.staticResult = res.map(element => {
            return new SearchItem(
              element.trackId,
              element.trackName,
              element.artistId,
              element.artworkUrl100,
              element.artistName,
              element.collectionId,
              element.collectionName,
              element.collectionViewUrl,
              element.country
            )
          });
        },
        msg => {
          // Error
        });
  }

  moveToArtistSection(): void {
    this.artistSection.nativeElement.scrollIntoView({ behavior: 'smooth'});
  }

  ngOnDestroy() {    
    document.body.scrollTop = 0;
  }
}
