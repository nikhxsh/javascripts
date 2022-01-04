import { Component, OnInit } from '@angular/core';
import { FormField } from 'ngmodelform';
import { FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'form-package',
	templateUrl: './form-package.component.html'
})
export class FormPackageComponent implements OnInit {
	modelFormFields: FormField[] = [];
	formValues: string;
	resetForm: false;

	constructor() {
	}

	ngOnInit(): void {
		let countries = ['India', 'Germany', 'Japan'];
		let cities = ['Pune', 'Berlin', 'Tokyo'];
		let genders = ["Male", "Female", "Other"];
		this.modelFormFields = [
			new FormField({ label: "Name" }).TextField({
				name: "name",
				control: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)])
			}),
			new FormField({ label: "Password" }).PasswordField({
				name: "password", control: new FormControl('', [Validators.required, Validators.minLength(3)])
			}),
			new FormField({ label: "Email" }).EmailField({
				name: "email", control: new FormControl('', [Validators.required, Validators.email])
			}),
			new FormField({ label: "Country" }).SelectField({
				name: "country", control: new FormControl('', Validators.required)
			}, countries),
			new FormField({ label: "Cities" }).SelectField({
				name: "cities", control: new FormControl('', Validators.required)
			}, cities, true),
			new FormField({ label: "Gender" }).RadioField({
				name: "gender", control: new FormControl(genders[2], Validators.required)
			}, genders),
			new FormField({ label: "Notes" }).TextAreaField({
				name: "notes", control: new FormControl('', [Validators.maxLength(15), Validators.required])
			}),
			new FormField({ label: "Terms & Conditions" }).CheckBoxField({
				name: "tnc", control: new FormControl('', Validators.required)
			})
		];
	}

	public onFormSubmit(event: any) {
		this.formValues = event;
	}
}