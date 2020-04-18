import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'model-form',
	templateUrl: './model-form.component.html'
})
export class ModelformComponent implements OnInit {
	langs: string[] = [
		'Hindi',
		'English',
		'French',
		'German',
	];
	myform: FormGroup;
	firstName: FormControl;
	lastName: FormControl;
	email: FormControl;
	password: FormControl;
	language: FormControl;

	/**
	  * > In model driven we create a model on the component and then use directives to
	  *   map elements in the template to our form model. 
	  * > form as a model composed of instances of FormGroups and FormControls
	  * ① myform is an instance of FormGroup and represents the form itself.
	  * ② FormGroups can nest inside other FormGroups.
	  * ③ We create a FormControl for each template form control.
	  * > We can also associate a group of template form controls to an instance of a form group on our
	  *   model using formGroupName directive.
	  * ① Since our firstName and lastName controls are grouped under a form group called name we’ll do just that.
	  * ① Use formGroup to bind the form to an instance of FormGroup on our component.
	  * ② Use formGroupName to map to a child FormGroup of myform.
	  * ③ Use formControlName to bind to an instance of a FormControl, since these form controls are under
	  *   a formGroupName of name, Angular will try and find the control in under myform['name'].
	  * ④ Use formControlName to bind to an instance of a FormControl directly under myform.
	  */
	constructor() { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();
	}

	createFormControls() {
		this.firstName = new FormControl('', Validators.required);
		this.lastName = new FormControl('', Validators.required);
		this.email = new FormControl('', [
			Validators.required,
			Validators.pattern("[^ @]*@[^ @]*")
		]);
		this.password = new FormControl('', [
			Validators.required,
			Validators.minLength(8)
		]);
		this.language = new FormControl('', Validators.required);
	}

	createForm() {
		this.myform = new FormGroup({
			name: new FormGroup({
				firstName: this.firstName,
				lastName: this.lastName,
			}),
			email: this.email,
			password: this.password,
			language: this.language
		});
	}
}
