import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AngularDataTableModule } from 'angular-custom-datatable'

import { AppComponent } from './app.component';
import { RouteRoutingModule } from './route-routing.module';
import { WineryService } from './winery.service';
import { DatePipe } from '@angular/common';
import { CustomclockComponent } from './customclock/customclock.component';
import { WineryComponent } from './winery/winery.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomclockComponent,
    WineryComponent
  ],
  imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
    RouteRoutingModule,
    AngularDataTableModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    WineryService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
