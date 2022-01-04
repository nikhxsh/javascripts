import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgDataGridComponent } from './ng-datagrid.component';

describe('NgdatagridComponent', () => {
	let component: NgDataGridComponent;
	let fixture: ComponentFixture<NgDataGridComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [NgDataGridComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(NgDataGridComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
