import { FormControl } from '@angular/forms';

export class ModelFormControl {
	name: string;
	control: FormControl;

	constructor(name: string, control: FormControl) {
		this.name = name;
		this.control = control;
	}
}

export class FormField {
	label: string;
	controlName: any;
	control: FormControl;
	successText: string;
	type: FieldType;
	placeHolder: string;

	constructor(label: string,
		controlName: any,
		control: FormControl,
		type: FieldType = FieldType.Text) {
		this.label = label;
		this.controlName = controlName;
		this.control = control;
		this.type = type;
	}
}

export class DropDown extends FormField {
	values: any[];
	constructor(label: string,
		controlName: any,
		control: FormControl,
		values: any[]) {
		super(label, controlName, control, FieldType.DropDown);
		this.values = values;
	}
}

export enum FieldType { Text = 1, Email, Password, DropDown, CheckBox };