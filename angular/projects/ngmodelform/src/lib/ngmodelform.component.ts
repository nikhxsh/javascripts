import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModelFormControl, FormField } from './ngmodelform.model';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'ngmodelform',
	templateUrl: './ngmodelform.component.html',
	styles: []
})
export class NgModelformComponent {

	formGroup: FormGroup;
	formControls: ModelFormControl[] = [];

	_formFields: FormField[] = [];;
	@Input()
	set formFields(val: FormField[]) {
		this._formFields = val;
		this.createControls();
		this.createForm();
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

	createControls() {
		this.formFields.forEach(field => {
			this.formControls.push(new ModelFormControl(field.controlName, field.control));
		});
	}

	createForm(): void {
		this.formControls.forEach(field => {
			this.formGroup.addControl(field.name, field.control);
		});
	}

	onSubmitClick(): void {
		this.onSubmit.emit(this.formGroup.value);
	}

	resetModelForm(): void {
		this.formGroup.reset();
	}
}
