import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModelformComponent } from './ngmodelform.component';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [NgModelformComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule
	],
	exports: [NgModelformComponent]
})
export class NgModelformModule { }
