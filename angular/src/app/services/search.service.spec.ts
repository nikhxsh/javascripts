import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { SearchService } from './search.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeSearchitems } from '../mocks/fakes';

describe('Search service', () => {

    let httpTestingController: HttpTestingController;
    let service: SearchService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SearchService],
            imports: [HttpClientTestingModule]
        })

        // Returns a service with the MockBackend so we can test with dummy responses
        service = TestBed.get(SearchService);
        // Inject the http service and test controller for each test
        httpTestingController = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    xit('Search 1 should return search items', fakeAsync(() => {
        service.search1('eminem')
        // Expect a call to this URL
        const req = httpTestingController.expectOne('https://itunes.apple.com/search?term=eminem&media=music&limit=20');
        // Assert that the request is a GET.
        expect(req.request.method).toEqual("GET");
        // Respond with this data when called
        req.flush(fakeSearchitems);
        // Call tick whic actually processes te response
        tick();
        // Run our tests
        service.search1('eminem').subscribe(searchResult => {
            expect(searchResult.length).toBe(1);        
            expect(searchResult[0].trackName).toBe('Track 1');         
        });
    }));
});