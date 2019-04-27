import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SearchItem } from './searchitem';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  apiRoot: string = 'https://itunes.apple.com/search';

  constructor(private http: HttpClient) { }

  find(term: string) : Observable<SearchItem[]> {
    let params = new HttpParams({
      fromObject: {
        term: term,
        media: 'music',
        limit: '10',
      }
    });
    return this.http.get(this.apiRoot, { params })
      .pipe(
        map((response: any) => response.results as any[]),
        map(results => {
          return results.map(element => {
            return new SearchItem(
              element.trackName,
              element.artistName,
              element.artworkUrl100,
              element.collectionName,
              element.collectionViewUrl,
              element.country
            )
          }
          )
        })
      );
  }

  search(term: string, type: string, limit: string) {
    let params = new HttpParams({
      fromObject: {
        term: term,
        media: type,
        limit: limit,
      }
    });
    return this.http.get(this.apiRoot, { params })
      .pipe(
        map((response: any) => response.results as any[])
      );
  }
}
