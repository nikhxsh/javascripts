import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgdatagridComponent } from './ngdatagrid.component';

describe('NgdatagridComponent', () => {
  let component: NgdatagridComponent;
  let fixture: ComponentFixture<NgdatagridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgdatagridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgdatagridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
