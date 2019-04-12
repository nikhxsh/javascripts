import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomclockComponent } from './customclock.component';

describe('CustomclockComponent', () => {
  let component: CustomclockComponent;
  let fixture: ComponentFixture<CustomclockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomclockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomclockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
