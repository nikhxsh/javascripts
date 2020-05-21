import { Component, Input } from '@angular/core';
import { TextField } from './ngmodelform.model';
import { FormGroup } from '@angular/forms';
@Component({
	selector: 'nginputfield',
	templateUrl: './nginputfield.component.html'
})
export class NgInputFieldComponent {

	@Input() group: FormGroup;
	@Input() textField: TextField;
	@Input() type: string;

	getErrors(): string[] {
		let errors = [];
		if (this.textField.field.control.errors.required)
			errors.push(`${this.textField.label} is required.`);
		if (this.textField.field.control.errors.pattern)
			errors.push(`${this.textField.label} is non-compliant with pattern.`);
		return errors;
	}
}
