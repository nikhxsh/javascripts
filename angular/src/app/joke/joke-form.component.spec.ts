import { JokeformComponent } from "./joke-form.component";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, AbstractControl } from '@angular/forms';
import { Joke } from './Joke';
import { fakeJoke } from '../mocks/fakes';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('JokeFormComponent', () => {
	let component: JokeformComponent;
	let fixture: ComponentFixture<JokeformComponent>;
	let setupFormControl: AbstractControl;
	let punchlineFormControl: AbstractControl;
	let submitEl: DebugElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ReactiveFormsModule, FormsModule],
			declarations: [JokeformComponent]
		});

		fixture = TestBed.createComponent(JokeformComponent);
		component = fixture.componentInstance;
		component.ngOnInit()

		setupFormControl = component.jokeForm.controls['setup'];
		punchlineFormControl = component.jokeForm.controls['punchline'];

		submitEl = fixture.debugElement.query(By.css('#createJoke'));
	});

	// Check following link for detectChanges 
	// (https://stackoverflow.com/questions/46359668/how-to-properly-implement-detectchanges-in-angular2)

	it('Form invalid for empty Values', () => {
		expect(component.jokeForm.valid).toBeFalsy();
	});

	it('Form invalid for either of empty field', () => {
		setupFormControl.setValue(fakeJoke.setup);
		expect(component.jokeForm.valid).toBeFalsy();
	});

	it('Form valid for correct Values', () => {
		setupFormControl.setValue(fakeJoke.setup);
		punchlineFormControl.setValue(fakeJoke.punchline);
		expect(component.jokeForm.valid).toBeTruthy();
	});

	it('Form emmits Joke upon submit (Create)', () => {
		expect(component.jokeForm.valid).toBeFalsy();
		setupFormControl.setValue(fakeJoke.setup);
		punchlineFormControl.setValue(fakeJoke.punchline);
		expect(component.jokeForm.valid).toBeTruthy();

		let joke: Joke;
		component.jokeCreated.subscribe(x => {
			joke = x;
		})

		component.createJoke();

		expect(joke.setup).toBe(fakeJoke.setup);
		expect(joke.punchline).toBe(fakeJoke.punchline);
	});

	it('Submit button disabled for invalid values', () => {
		fixture.detectChanges();
		expect(submitEl.nativeElement.disabled).toBeTruthy();
	});

	it('Submit button disabled for either of empty values', () => {
		fixture.detectChanges();
		setupFormControl.setValue(fakeJoke.setup);
		expect(setupFormControl.value).toBe(fakeJoke.setup);
		expect(submitEl.nativeElement.disabled).toBeTruthy();
	});

	it('Submit button enabled for correct values', () => {
		setupFormControl.setValue(fakeJoke.setup);
		expect(setupFormControl.value).toBe(fakeJoke.setup);
		punchlineFormControl.setValue(fakeJoke.punchline);
		expect(punchlineFormControl.value).toBe(fakeJoke.punchline);
		expect(submitEl.nativeElement.disabled).toBeFalsy();
		expect(component.jokeForm.valid).toBeTruthy();
	});
});