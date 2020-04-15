import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
	selector: 'ngcheckboxfield',
	templateUrl: './ngcheckboxfield.component.html'
})
export class NgCheckBoxFieldComponent {
	@Input() label: string;
	@Input() name: string;
	@Input() group: string;
	@Input() control: FormControl;
	@Input() validText: string;
}
