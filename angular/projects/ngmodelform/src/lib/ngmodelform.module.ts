import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModelFormComponent } from './ngmodelform.component';
import { NgInputFieldComponent } from './nginputfield.component';
import { NgSelectFieldComponent } from './ngselectfield.component';
import { NgTextAreaFieldComponent } from './ngtextareafield.component';
import { NgCheckBoxFieldComponent } from './ngcheckboxfield.component';
import { NgRadioFieldComponent } from './ngradiofield.component';
import { NameFormatter } from './ngnameformatter.pipe';

@NgModule({
	declarations: [
		NgModelFormComponent,
		NgInputFieldComponent,
		NgTextAreaFieldComponent,
		NgSelectFieldComponent,
		NgCheckBoxFieldComponent,
		NgRadioFieldComponent,
		NameFormatter
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule
	],
	exports: [NgModelFormComponent]
})
export class NgModelformModule { }
