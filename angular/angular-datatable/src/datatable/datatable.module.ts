import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DatatableComponent } from './datatable.component';
import { KeyvaluePipe } from './keyvalue.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  declarations: [
    DatatableComponent,
    KeyvaluePipe
  ],
  exports: [DatatableComponent],
  bootstrap: [DatatableComponent]
})
export class AngularDataTableModule { }
