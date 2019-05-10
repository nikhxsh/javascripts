import { Observable, of } from 'rxjs';
import { SearchItem } from '../itunes/searchitem';
import { searchitems } from './search.fakes';

export class MockSearchServiceStub {

	search1(term: string): Observable<SearchItem[]> {
		return of(searchitems)
	}

	search3(term: string): Observable<SearchItem[]> {
		return of(searchitems)
	}
}