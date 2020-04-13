import { NgModule } from '@angular/core';
import { NgPaginationComponent } from './ngpagination.component';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [NgPaginationComponent],
	imports: [
		CommonModule
	],
	exports: [NgPaginationComponent]
})
export class NgPaginationModule { }
