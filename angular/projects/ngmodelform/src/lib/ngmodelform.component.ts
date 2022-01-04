import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField, FormFieldControl } from './ngmodelform.model';

@Component({
	selector: 'ngmodelform',
	templateUrl: './ngmodelform.component.html'
})
export class NgModelFormComponent {

	formGroup: FormGroup;
	formControls: FormFieldControl[] = [];

	_formFields: FormField[] = [];
	@Input()
	set formFields(val: FormField[]) {
		this._formFields = val;
		this.prepareForm();
	}

	get formFields(): FormField[] {
		return this._formFields;
	}

	_reset: boolean;
	@Input()
	set reset(reset: boolean) {
		this._reset = reset;
		if (reset)
			this.resetModelForm();
	}

	@Input() submitText: string = "Submit";

	@Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

	constructor() {
		this.formGroup = new FormGroup({});
	}

	prepareForm() {
		this.formFields.forEach(item => {
			this.formGroup.addControl(item.field.name, item.field.control);
		});
	}

	onSubmitClick(): void {
		this.onSubmit.emit(this.formGroup.value);
	}

	resetModelForm(): void {
		this.formGroup.reset();
	}
}
