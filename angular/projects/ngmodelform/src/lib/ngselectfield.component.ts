import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
	selector: 'ngselectfield',
	templateUrl: './ngselectfield.component.html'
})
export class NgSelectFieldComponent {
	@Input() label: string;
	@Input() name: string;
	@Input() group: string;
	@Input() control: FormControl;
	@Input() options: string[];
	@Input() multiple: boolean;
	@Input() validText: string;
	@Input() placeholder: string;
}
