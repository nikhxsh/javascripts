import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgmodelformComponent } from './ngmodelform.component';

describe('NgmodelformComponent', () => {
  let component: NgmodelformComponent;
  let fixture: ComponentFixture<NgmodelformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgmodelformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgmodelformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
