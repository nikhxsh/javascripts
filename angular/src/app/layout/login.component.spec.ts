import { TestBed, ComponentFixture, fakeAsync, async, tick, inject } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';

describe('Auth Service', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;
	let service: AuthService;
	let el: DebugElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [LoginComponent],
			providers: [AuthService]
		})

		fixture = TestBed.createComponent(LoginComponent);
		service = TestBed.get(AuthService);
		component = fixture.componentInstance;
		/**
		 * The fixture as well as holding an instance of the component also holds a reference to something called a 
		 *  DebugElement, this is a wrapper to the low level DOM element that represents the components view, via the 
		 *  debugElement property.
		 * 
		 * We store a reference to a DOM element in our el variable
		 */
		el = fixture.debugElement.query(By.css('a'));
	});

	it('should be created', () => {
		const service: AuthService = TestBed.get(AuthService);
		expect(service).toBeTruthy();
	});

	it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
		inject([AuthService], (injectService: AuthService) => {
			expect(injectService).toBe(service);
		})
	);

	xit('login Link hidden when the user is authenticated', () => {
		// To being with Angular has not done any change detection so the content is blank.
		expect(el.nativeElement.textContent.trim()).toBe('');
		/**
		 * We initially expect the text inside the a tag to be blank.
		 * That’s because when Angular first loads no change detection has been triggered and therefore the 
		 *  view doesn’t show either the Login or Logout text.
		 * Trigger change detection and this lets the template update to the initial value which is Login since by
		 *  default we are not authenticated
		 */
		fixture.detectChanges();
		expect(el.nativeElement.textContent.trim()).toBe('Login');
		/**
		 * Once we trigger a change detection run Angular checks property bindings and since the AuthService 
		 *  defaults to not authenticated we show the text Login
		 */
		spyOn(service, 'isAuthenticated').and.returnValue(true);
		expect(el.nativeElement.textContent.trim()).toBe('Login');
		/**
		 * But at this point the button content still isn’t Logout, we need to trigger another change detection
		 */
		fixture.detectChanges();
		// Now the label is Logout
		expect(el.nativeElement.textContent.trim()).toBe('Logout');
	});

	it('Link label via fakeAsync() and tick()', fakeAsync(() => {
		expect(el.nativeElement.textContent.trim()).toBe('');
		fixture.detectChanges();
		expect(el.nativeElement.textContent.trim()).toBe('Login');
		expect(component.loggedOut).toBe(true);

		spyOn(service, 'isAuthenticated').and.returnValue(Promise.resolve(true));

		component.ngOnInit();
		// Simulates the passage of time until all pending asynchronous activities complete
		tick();
		fixture.detectChanges();
		expect(el.nativeElement.textContent.trim()).toBe('Logout');
		expect(component.loggedOut).toBe(false);
	}));

	it('Link label via async() and whenStable()', async(() => {
		// async() knows about all the pending promises defined in it's function body.
		fixture.detectChanges();
		expect(el.nativeElement.textContent.trim()).toBe('Login');
		expect(component.loggedOut).toBe(true);
		spyOn(service, 'isAuthenticated').and.returnValue(Promise.resolve(true));

		fixture.whenStable().then(() => {
			// This is called when ALL pending promises have been resolved
			fixture.detectChanges();
			expect(el.nativeElement.textContent.trim()).toBe('Logout');
			expect(component.loggedOut).toBe(false);
		});

		component.ngOnInit();

	}));

	it('Link label via jasmine.done', (done) => {
		fixture.detectChanges();
		expect(el.nativeElement.textContent.trim()).toBe('Login');
		expect(component.loggedOut).toBe(true);

		// Make the authService return a promise that resolves to true
		let spy = spyOn(service, 'isAuthenticated').and.returnValue(Promise.resolve(true));
		// We trigger the component to check the authService again
		component.ngOnInit();

		// We now want to call a function when the Promise returned from authService.isAuthenticated() is resolved
		spy.calls.mostRecent().returnValue.then(() => {
			// The needsChanged boolean has been updated on the Component so to update the template we trigger change detection
			fixture.detectChanges();
			// Now the label is Logout
			expect(el.nativeElement.textContent.trim()).toBe('Logout');
			// We tell jasmine we are done with this test spec
			expect(component.loggedOut).toBe(false);
			done();
		});
	});
});
