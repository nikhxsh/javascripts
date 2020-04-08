import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SearchItem } from '../itunes/searchitem'
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SearchService {
	apiRoot: string = 'https://itunes.apple.com';

	constructor(private http: HttpClient) { }

	search1(term: string): Observable<SearchItem[]> {

		if (term.length == 0)
			return of<SearchItem[]>([]);

		let params = new HttpParams({
			fromObject: {
				term: term,
				media: 'music',
				limit: '20',
			}
		});

		return this.http.get(`${this.apiRoot}/search`, { params })
			.pipe(
				map((response: any) => response.results as any[]),
				map(results => {
					return results.map(element => {
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
					})
				})
			);
	}

	search2(term: string): Observable<SearchItem[]> {
		let apiURL = `${this.apiRoot}/search?term=${term}&media=music&limit=20`;
		return this.http.jsonp(apiURL, 'callback')
			.pipe(
				map((response: any) => response.results as any[]),
				map(results => {
					return results.map(element => {
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
					})
				})
			);
	}

	search3(term: string): Observable<SearchItem[]> {

		let params = new HttpParams({
			fromObject: {
				term: term,
				media: 'music',
				limit: '20',
			}
		});
		return this.http.get(`${this.apiRoot}/search`, { params })
			.pipe(
				map((response: any) => response.results as any[])
			);
	}

	getArtist(artistId: string) {
		let params = new HttpParams({
			fromObject: {
				id: artistId
			}
		});
		return this.http.get(`${this.apiRoot}/lookup`, { params })
			.pipe(
				map((response: any) => response.results[0])
			);
	}

	getArtistTrackList(artistId: string) {
		let params = new HttpParams({
			fromObject: {
				id: artistId,
				entity: 'song'
			}
		});
		return this.http.get(`${this.apiRoot}/lookup`, { params })
			.pipe(
				map((response: any) => response.results.slice(1) as any[])
			);
	}

	getArtistAlbumList(artistId: string) {
		return this.http.jsonp(`${this.apiRoot}/lookup?id=${artistId}&entity=album`, 'callback')
			.pipe(
				map((response: any) => response.results.slice(1) as any[])
			);
	}
}
