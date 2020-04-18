import { Component, ViewChild } from '@angular/core';

@Component({
	selector: 'template-form',
	templateUrl: './template-form.component.html'
})
export class TemplateformComponent {
	@ViewChild('f', { static: false }) form: any;
	langs: string[] = [
		'Hindi',
		'English',
		'French',
		'German',
	];

	/**
	 * > The key in understanding the template driven approach is that it still uses the same models as the
	 * model driven approach. In the template driven approach Angular creates the models, the FormGroups
	 * and FormControls, for us via directives we add to the template.
	 * > Template Drive Forms are just Model Driven Form but driven by directives in the
	 * the template versus code in the component.
	 */
	constructor() {
	}

	onSubmit() {
		if (this.form.valid) {
			console.log("Form Submitted!");
			this.form.reset();
		}
	}
}
