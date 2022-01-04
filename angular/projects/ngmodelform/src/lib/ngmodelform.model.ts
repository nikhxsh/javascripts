import { FormControl } from '@angular/forms';

export interface FormFieldControl {
	name: string;
	control: FormControl;
}

export class FormField {
	label: string;
	field: FormFieldControl;
	type: FieldType;
	helpText: string;
	validText: string;
	invalidText: string;
	placeHolder: string;
	masked: boolean;
	checked: boolean;
	defaultDomains: string[];
	rows: string;
	options: any[];
	multiple: boolean;
	values: string[];
	formGroupClass: string = 'form-group';
	fieldClass: string = 'form-control form-control-sm';
	validClass: string = 'is-valid';
	invalidClass: string = 'is-invalid';
	validFeedbackClass: string = 'valid-feedback';
	invalidFeedbackClass: string = 'invalid-feedback';

	constructor(obj: Partial<FormField>) {
		Object.assign(this, obj);
	}

	InputField(
		field: FormFieldControl,
		validText?: string,
		placeHolder?: string,
		helpText?: string) {
		return Object.assign(this, new FormField({ field: field, validText: validText, placeHolder: placeHolder, helpText: helpText }))
	}

	TextField(
		field: FormFieldControl,
		validText?: string,
		placeHolder?: string,
		helpText?: string) {
		return Object.assign(this, new FormField({ field: field, validText: validText, placeHolder: placeHolder, helpText: helpText, type: FieldType.Text }))
	}

	PasswordField(
		field: FormFieldControl,
		masked: boolean = true,
		validText: string = '',
		placeHolder: string = '',
		helpText: string = '') {
		return Object.assign(this, new FormField({ field: field, validText: validText, placeHolder: placeHolder, helpText: helpText, type: FieldType.Password, masked: masked }))
	}

	EmailField(
		field: FormFieldControl,
		validText: string = '',
		placeHolder: string = '',
		helpText: string = '') {
		return Object.assign(this, new FormField({ field: field, validText: validText, placeHolder: placeHolder, helpText: helpText, type: FieldType.Email }))
	}

	TextAreaField(
		field: FormFieldControl,
		rows: string = "3",
		validText: string = '',
		helpText: string = '') {
		return Object.assign(this, new FormField({ field: field, validText: validText, helpText: helpText, type: FieldType.TextArea, rows: rows }))
	}

	SelectField(
		field: FormFieldControl,
		options: any[],
		multiple: boolean = false,
		validText: string = '',
		helpText: string = '') {
		this.options = []
		return Object.assign(this, new FormField({ field: field, validText: validText, helpText: helpText, type: FieldType.Select, options: options, multiple: multiple }))
	}

	CheckBoxField (
		field: FormFieldControl,
		validText: string = '',
		helpText: string = '') {
		this.options = []
		return Object.assign(this, new FormField({ field: field, validText: validText, helpText: helpText, type: FieldType.CheckBox }))
	}

	RadioField  (
		field: FormFieldControl,
		values: string[],
		helpText: string = '') {
		this.values = []
		return Object.assign(this, new FormField({ field: field, helpText: helpText, type: FieldType.Radio, values: values }))
	}
}

export enum FieldType { Text, Password, TextArea, Select, CheckBox, Radio, Email };