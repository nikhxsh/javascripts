import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { NgDataGridComponent } from './ngdatagrid.component';
import { GetkeysPipe } from './getkeys.pipe';

@NgModule({
	declarations: [
		NgDataGridComponent,
		GetkeysPipe
	],
	imports: [
		CommonModule,
		FormsModule,
		PaginationModule.forRoot()
	],
	exports: [
		NgDataGridComponent
	]
})
export class NgDataGridModule { }
