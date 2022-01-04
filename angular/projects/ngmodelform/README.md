# Angular Simple Model Form

This package is useful to implement simple model form with default bootstrap design but addon angular support. 

#### Angular Template file
1. Import `NgModelformModule` in your `app.module`
2. Add below mentioned selector tag in your `component's html template`

```html
<ngmodelform
    [formFields]="modelFormFields"
    [reset]="resetForm"
    (onSubmit)="onFormSubmit($event)">
</ngmodelform>
```

#### Angular Component
```javascript
import { Component, OnInit } from '@angular/core';
import { FormField, TextField, PasswordField, EmailField, TextAreaField, SelectField, RadioField, CheckBoxField } from 'ngmodelform';
import { FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'form-package',
	templateUrl: './form-package.component.html'
})
export class FormPackageComponent implements OnInit {
	modelFormFields: FormField[] = [];
	formValues: string;

	constructor() {
	}

	ngOnInit(): void {
		let countries = ['India', 'Germany', 'Japan'];
		let cities = ['Pune', 'Berlin', 'Tokyo'];
		let genders = ["Male", "Female", "Other"];
		this.modelFormFields = [
			new TextField("Name", {
				name: "name",
				control: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)])
			}),
			new PasswordField("Password", {
				name: "password", control: new FormControl('', [Validators.required, Validators.minLength(3)])
			}),
			new EmailField("Email", {
				name: "email", control: new FormControl('', [Validators.required, Validators.email])
			}),
			new SelectField("Country", {
				name: "country", control: new FormControl('', Validators.required)
			}, countries),
			new SelectField("Cities", {
				name: "cities", control: new FormControl('', Validators.required)
			}, cities, true),
			new RadioField("Gender", {
				name: "gender", control: new FormControl(genders[2], Validators.required)
			}, genders),
			new TextAreaField("Notes", {
				name: "notes", control: new FormControl('', Validators.maxLength(15))
			}),
			new CheckBoxField("Terms & Conditions", {
				name: "tnc", control: new FormControl('', Validators.requiredTrue)
			})
		];
	}

	public onFormSubmit(event: any) {
		this.formValues = event;
	}
}
```

#### UI

![](https://github.com/nikxsh/javascripts/blob/master/files/ngmodelform-invalid.JPG?raw=true)

![](https://github.com/nikxsh/javascripts/blob/master/files/ngmodelform-valid.JPG?raw=true)


#### Notes
- Make sure that 
    - `bootstrap.bundle.min.js` has added under `scripts` section of `angular.json` file
    - `bootstrap.min.css` has added under `styles` section of `angular.json` file