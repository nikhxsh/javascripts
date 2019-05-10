import { TestBed, ComponentFixture } from "@angular/core/testing";
import { ItuneSearchComponent } from './itune-search.component';
import { SearchService } from '../services/search.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MockSearchServiceStub } from '../mocks/search.service.mock';
import { of } from 'rxjs';
import { searchitems } from '../mocks/search.fakes';

describe('itune Search Component', () => {
	let component: ItuneSearchComponent;
	let fixture: ComponentFixture<ItuneSearchComponent>;
	let dataStub: MockSearchServiceStub;

	beforeEach(() => {
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
		fixture = TestBed.createComponent(ItuneSearchComponent);
		component = fixture.componentInstance;
		dataStub = fixture.debugElement.injector.get(SearchService);
	});

	it('should create component instance', () => {
		expect(component).toBeTruthy();
	});

	it('should do static search', () => {
		fixture.detectChanges();
		component.searchTerm = 'Test';
		component.staticSearch();
		expect(component.staticResult.length).toEqual(3);
	});

	it('should do static search using spy', () => {
		const spy = spyOn(dataStub, 'search3').and.returnValue(
			of(searchitems)
		);
		fixture.detectChanges();
		console.log(`Check: ${spy.calls.any()}`);
		expect(component.staticResult).toEqual(searchitems);
		expect(spy.calls.any()).toEqual(true);
	});

	it('should do dynamic search', () => {
		component.ngOnInit();
		component.dynamicResult.subscribe((x) => {
			expect(x).toEqual(searchitems);
			expect(x.length).toEqual(searchitems.length);
		});
	});

	afterEach(() => {
		fixture.destroy();
		component = null;
	});
});