import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxstoreComponent } from './ngrxstore.component';

describe('NgrxstoreComponent', () => {
  let component: NgrxstoreComponent;
  let fixture: ComponentFixture<NgrxstoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgrxstoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgrxstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
