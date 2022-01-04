import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from './ngmodelform.model';
@Component({
	selector: 'ngcheckboxfield',
	templateUrl: './ngcheckboxfield.component.html'
})
export class NgCheckBoxFieldComponent {
	@Input() formGroup: FormGroup;
	@Input() checkBoxField: FormField;
}
