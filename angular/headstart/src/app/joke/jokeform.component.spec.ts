import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeformComponent } from './jokeform.component';

describe('JokeformComponent', () => {
  let component: JokeformComponent;
  let fixture: ComponentFixture<JokeformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JokeformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JokeformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
