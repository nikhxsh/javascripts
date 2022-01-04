import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from './ngmodelform.model';
@Component({
	selector: 'ngtextareafield',
	templateUrl: './ngtextareafield.component.html'
})
export class NgTextAreaFieldComponent {
	@Input() textAreaField: FormField;
	@Input() formGroup: FormGroup;
}
