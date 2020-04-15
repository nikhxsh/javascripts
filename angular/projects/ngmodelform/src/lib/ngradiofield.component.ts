import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
	selector: 'ngradiofield',
	templateUrl: './ngradiofield.component.html'
})
export class NgRadioFieldComponent {
	@Input() label: string;
	@Input() name: string;
	@Input() group: string;
	@Input() control: FormControl;
	@Input() values: string[];
	@Input() checked: number;
}
