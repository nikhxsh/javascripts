import {
	Component,
	OnInit,
	Input,
	ViewEncapsulation,
	OnChanges,
	DoCheck,
	OnDestroy,
	AfterContentInit,
	AfterContentChecked,
	AfterViewInit,
	AfterViewChecked
} from '@angular/core';
import { Joke } from "./Joke";

/**
 * > Normally if we change a css class the effect is seen throughout an application, something special is
 * happening here and it’s called View Encapsulation.
 * > Angular is inspired from Web Components, a core feature of which is the shadow DOM.
 * > The shadow DOM lets us include styles into Web Components without letting them leak outside the
 * component’s scope.
 * > The valid values for this config property are:
 *   • ViewEncapsulation.Native
 *      - However with ViewEncapsulation.Native our component is also isolated from the global styles we’ve
 *        defined for our application. So we don’t inherit the twitter bootstrap styles and have to define all
 *        the required styles on our component decorator.
 *   • ViewEncapsulation.Emulated 
 *      - In the ViewEncapsulation.Emulated mode Angular changes our generic css class selector to one that
 *      target just a single component type by using automatically generated attributes.
 *      - Any styles we define on a component don’t leak out to the rest of the application but with
 *      ViewEncapsulation.Emulated our component still inherits global styles from twitter bootstrap.
 *   • ViewEncapsulation.None.
 *      - We are not encapsulating anything, the style we defined in our card form component has leaked
 *        out and started affecting the other components.
 */
@Component({
	selector: 'joke',
	templateUrl: './joke.component.html',
	styleUrls: ['./joke.component.css'],
	encapsulation: ViewEncapsulation.Emulated //default set
	// encapsulation: ViewEncapsulation.Native
	// encapsulation: ViewEncapsulation.None
})
export class JokeComponent implements
	OnInit,
	OnChanges,
	DoCheck,
	OnDestroy,
	AfterContentInit,
	AfterContentChecked,
	AfterViewInit,
	AfterViewChecked {
	//This @Input now becomes part of the public interface of our component.
	@Input('joke') data: Joke;

	/**
	 * > A component in Angular has a life-cycle, a number of different phases it goes through from birth to death.
	 * > We can hook into those different phases to get some pretty fine grained control of our application.
	 * > These phases are broadly split up into phases that are linked to the component itself and phases
	 * that are linked to the children of that component.
	 */

	//This is invoked when Angular creates a component or directive by calling new on the class.
	constructor() {
		console.log(`new - data is ${this.data}`);
	}

	// ngOnChanges
	// Invoked every time there is a change in one of th input properties of the component.
	ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
		console.log(`ngOnChanges - data is ${this.data}`);
	}

	// Invoked when given component has been initialized.
	// This hook is only called once after the first ngOnChanges
	ngOnInit(): void {
		console.log(`ngOnInit - data is ${this.data}`);
	}

	// Invoked when the change detector of the given component is invoked. It allows us to implement
	// our own change detection algorithm for the given component.
	// ngDoCheck and ngOnChanges should not be implemented together on the same
	// component.
	ngDoCheck(): void {
		console.log("ngDoCheck")
	}

	/**
	 * These hooks are only called for components and not directives 
	*/

	// Invoked after Angular performs any content projection into the components view
	// We have implemented content projection
	ngAfterContentInit(): void {
		console.log("ngAfterContentInit");
	}

	// Invoked each time the content of the given component has been checked by the change detection
	// mechanism of Angular.
	// We have implemented content projection
	ngAfterContentChecked(): void {
		console.log("ngAfterContentChecked");
	}

	// Invoked each time the view of the given component has been checked by the change detection
	// mechanism of Angular.
	ngAfterViewInit(): void {
		console.log("ngAfterViewInit");
	}

	// Invoked when the component’s view has been fully initialized.
	ngAfterViewChecked(): void {
		console.log("ngAfterViewChecked");
	}

	// This method will be invoked just before Angular destroys the component.
	// Use this hook to unsubscribe observables and detach event handlers to avoid memory leaks.
	ngOnDestroy(): void {
		console.log("ngOnDestroy");
	}

	test() {
	}
}
