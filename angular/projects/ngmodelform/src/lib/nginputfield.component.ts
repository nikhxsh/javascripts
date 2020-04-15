import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
	selector: 'nginputfield',
	templateUrl: './nginputfield.component.html'
})
export class NgInputFieldComponent {
	@Input() label: string;
	@Input() type: string;
	@Input() name: string;
	@Input() group: string;
	@Input() control: FormControl;
	@Input() validText: string;
	@Input() placeholder: string;
}
