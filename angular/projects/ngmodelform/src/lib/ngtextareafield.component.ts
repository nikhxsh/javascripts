import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
	selector: 'ngtextareafield',
	templateUrl: './ngtextareafield.component.html'
})
export class NgTextAreaFieldComponent {
	@Input() label: string;
	@Input() type: string;
	@Input() name: string;
	@Input() group: string;
	@Input() control: FormControl;
	@Input() validText: string;
}
