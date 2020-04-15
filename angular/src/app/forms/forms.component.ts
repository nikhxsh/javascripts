import { Component, OnInit } from '@angular/core';
import { FormField, TextField, SelectField, RadioField, CheckBoxField } from 'ngmodelform';
import { FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'forms',
	templateUrl: './forms.component.html'
})
export class FormsComponent implements OnInit {
	modelFormFields: FormField[] = [];
	formValues: string;

	constructor() {
	}

	ngOnInit(): void {
		let countries = ['India', 'Russia', 'Germany'];
		let cities = ['Pune', 'Mumbai', 'Nagpur'];
		let genders = ["Male", "Female", "Other"];
		this.modelFormFields = [
			new TextField("Name", { name: "name", control: new FormControl('', Validators.required) }),
			new SelectField("Country", { name: "country", control: new FormControl('', Validators.required) }, countries),
			new SelectField("Cities", { name: "cities", control: new FormControl('', Validators.required) }, cities, true),
			new RadioField("Gender", { name: "gender", control: new FormControl(genders[2], Validators.required) }, genders),
			new CheckBoxField("Terms & Conditions", { name: "tnc", control: new FormControl('', Validators.requiredTrue) })
		];
	}

	public onFormSubmit(event: any) {
		this.formValues = event;
	}

}