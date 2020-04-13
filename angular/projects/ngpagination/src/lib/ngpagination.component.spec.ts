import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgpaginationComponent } from './ngpagination.component';

describe('NgpaginationComponent', () => {
  let component: NgpaginationComponent;
  let fixture: ComponentFixture<NgpaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgpaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgpaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
