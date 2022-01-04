import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from './ngmodelform.model';
@Component({
	selector: 'ngradiofield',
	templateUrl: './ngradiofield.component.html'
})
export class NgRadioFieldComponent {
	@Input() radioField: FormField;
	@Input() formGroup: FormGroup;
}
