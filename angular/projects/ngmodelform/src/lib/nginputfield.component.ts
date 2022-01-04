import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from './ngmodelform.model';
@Component({
	selector: 'nginputfield',
	templateUrl: './nginputfield.component.html'
})
export class NgInputFieldComponent {
	@Input() textField: FormField;
	@Input() formGroup: FormGroup;
	@Input() inputType: string;

	getErrors(): string[] {
		let errors = [];
		if (this.textField.field.control.errors['required'])
			errors.push(`${this.textField.label} is required.`);
		if (this.textField.field.control.errors['pattern'])
			errors.push(`${this.textField.label} is non-compliant with patterns.`);
		if (this.textField.field.control.errors['email'])
			errors.push(`Enter valid email address.`);
		if (this.textField.field.control.errors['minlength'])
			errors.push(`${this.textField.label} must contain atleast ${this.textField.field.control.errors['minlength'].requiredLength} characters.`);
		if (this.textField.field.control.errors['maxlength'])
			errors.push(`${this.textField.label} must contain max ${this.textField.field.control.errors['maxlength'].requiredLength} characters.`);
		return errors;
	}
}
