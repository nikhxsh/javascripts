import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeComponent } from './joke.component';
import { CardHoverDirective } from '../directives/card-hover.directive';
import { ChangeDetectionStrategy } from '@angular/core';

describe('JokeComponent', () => {
	let component: JokeComponent;
	let fixture: ComponentFixture<JokeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [JokeComponent, CardHoverDirective],
		})
		.overrideComponent(JokeComponent, {
			set: {changeDetection : ChangeDetectionStrategy.Default }
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(JokeComponent);
		component = fixture.componentInstance;
		//fixture.detectChanges();
	});

	it('should create an instance', () => {		
		expect(component).toBeTruthy();
	});
});
