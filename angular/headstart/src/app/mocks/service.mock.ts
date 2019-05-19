import { Observable, of } from 'rxjs';
import { SearchItem } from '../itunes/searchitem';
import { fakeSearchitems } from './fakes';

class MockSearchServiceStub {

	search1(term: string): Observable<SearchItem[]> {
		return of(fakeSearchitems)
	}

	search3(term: string): Observable<SearchItem[]> {
		return of(fakeSearchitems)
	}
}

class MockAuthService {
    authenticated = false;

    isAuthenticated() {
        return this.authenticated;
    }
}

export { MockSearchServiceStub, MockAuthService  }