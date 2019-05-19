import { TestBed, ComponentFixture } from "@angular/core/testing";
import { ItuneSearchComponent } from './itune-search.component';
import { SearchService } from '../services/search.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MockSearchServiceStub } from '../mocks/service.mock';
import { fakeSearchitems } from '../mocks/fakes';

describe('itune Search Component', () => {
	let component: ItuneSearchComponent;
	let fixture: ComponentFixture<ItuneSearchComponent>;
	let service: SearchService;

	beforeEach(() => {
		/**
		 * - The Angular Test Bed (ATB) is a higher level Angular Only testing framework that allows us to easily test behaviours 
		 * that depend on the Angular Framework
		 * - In the beforeEach function for our test suite we configure a testing module using the TestBed class.This creates a
		 *  test Angular Module which we can use to instantiate components, perform dependency injection and so on.
		 */
		TestBed.configureTestingModule({
			declarations: [ItuneSearchComponent],
			imports: [FormsModule, ReactiveFormsModule, RouterModule.forRoot([]), HttpClientModule],
			providers: [{
				provide: SearchService,
				useClass: MockSearchServiceStub
			}]
		}).compileComponents();
	});

	beforeEach(() => {
		//A fixture is a wrapper for a component and it’s template.
		fixture = TestBed.createComponent(ItuneSearchComponent);
		//We create an instance of a component fixture through the TestBed, this injects the SearchService into the 
		//component constructor
		component = fixture.componentInstance;
		service = fixture.debugElement.injector.get(SearchService);
	});

	it('should create component instance', () => {
		expect(component).toBeTruthy();
	});

	it('Search Service injected via component should be an instance of MockSearchServiceStub', () => {
        expect(service instanceof MockSearchServiceStub).toBeTruthy();
	});
	
	it('should do static search using mock data', () => {
		fixture.detectChanges();
		component.searchTerm = 'Test';
		component.staticSearch();
		expect(component.staticResult.length).toEqual(3);
	});

	it('should do dynamic search using mock data', () => {
		component.ngOnInit();
		component.dynamicResult.subscribe((x) => {
			expect(x).toEqual(fakeSearchitems);
			expect(x.length).toEqual(fakeSearchitems.length);
		});
	});

	afterEach(() => {
		fixture.destroy();
		component = null;
	});
});