import { FormControl } from '@angular/forms';

export interface FormFieldControl {
	name: string;
	control: FormControl;
}

export abstract class FormField {
	label: string;
	field: FormFieldControl;
	type: FieldType;
	helpText: string;
	validText: string;
	invalidText: string;
	formGroupClass: string = 'form-group';
	fieldClass: string = 'form-control form-control-sm';
	validClass: string = 'is-valid';
	invalidClass: string = 'is-invalid';
	validFeedbackClass: string = 'valid-feedback';
	invalidFeedbackClass: string = 'invalid-feedback';
}

export class InputField extends FormField {
	placeHolder: string;
	constructor(
		label: string,
		field: FormFieldControl,
		validText: string = '',
		placeHolder: string = '',
		helpText: string = '') {
		super();
		this.label = label;
		this.field = field;
		this.validText = validText;
		this.placeHolder = placeHolder;
		this.helpText = helpText;
	}
}

export class TextField extends InputField {
	constructor(
		label: string,
		field: FormFieldControl,
		validText: string = '',
		placeHolder: string = '',
		helpText: string = '') {
		super(label, field, validText, placeHolder, helpText);
		this.type = FieldType.Text;
	}
}

export class PasswordField extends InputField {
	masked: boolean;
	constructor(
		label: string,
		field: FormFieldControl,
		masked: boolean = true,
		validText: string = '',
		placeHolder: string = '',
		helpText: string = '') {
		super(label, field, validText, placeHolder, helpText);
		this.masked = masked;
		this.type = FieldType.Password;
	}
}

export class EmailField extends InputField {
	defaultDomains: string[];
	constructor(
		label: string,
		field: FormFieldControl,
		defaultDomains: string[] = [],
		validText: string = '',
		placeHolder: string = '',
		helpText: string = '') {
		super(label, field, validText, placeHolder, helpText);
		this.defaultDomains = defaultDomains;
		this.type = FieldType.Email;
	}
}

export class TextAreaField extends InputField {
	rows: number;
	constructor(
		label: string,
		field: FormFieldControl,
		rows: number = 3,
		validText: string = '',
		helpText: string = '') {
		super(label, field, validText, helpText);
		this.rows = rows;
		this.type = FieldType.TextArea;
	}
}

export class SelectField extends FormField {
	options: any[];
	multiple: boolean;
	constructor(
		label: string,
		field: FormFieldControl,
		options: any[],
		multiple: boolean = false,
		validText: string = '',
		helpText: string = '') {
		super();
		this.label = label;
		this.field = field;
		this.validText = validText;
		this.helpText = helpText;
		this.type = FieldType.Select;
		this.options = options;
		this.multiple = multiple;
	}
}

export class CheckBoxField extends FormField {
	constructor(
		label: string,
		field: FormFieldControl,
		validText: string = '',
		helpText: string = '') {
		super();
		this.label = label;
		this.field = field;
		this.validText = validText;
		this.helpText = helpText;
		this.type = FieldType.CheckBox;
	}
}

export class RadioField extends FormField {
	values: string[];
	constructor(
		label: string,
		field: FormFieldControl,
		values: string[],
		helpText: string = '') {
		super();
		this.label = label;
		this.field = field;
		this.values = values;
		this.helpText = helpText;
		this.type = FieldType.Radio;
	}
}

export enum FieldType { Text, Password, TextArea, Select, CheckBox, Radio, Email };