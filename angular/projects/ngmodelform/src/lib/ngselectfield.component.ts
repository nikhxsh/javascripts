import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from './ngmodelform.model';
@Component({
	selector: 'ngselectfield',
	templateUrl: './ngselectfield.component.html'
})
export class NgSelectFieldComponent {
	@Input() selectField: FormField;
	@Input() formGroup: FormGroup;
}
