import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JokeComponent } from './joke/joke.component';
import { JokelistComponent } from './joke/jokelist.component';
import { HomeComponent } from './home/home.component';
import { JokeformComponent } from './joke/jokeform.component';
import { HeaderComponent } from './_ui/header.component';
import { BasicComponent } from './basic/basic.component';
import { CardHoverDirective } from './directives/card-hover.directive';
import { FormsComponent } from './forms/forms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DefaultPipe } from './pipes/default.pipe';
import { ModelformComponent } from './forms/modelform.component';
import { ReactivemodelformComponent } from './forms/reactivemodelform.component';
import { TemplateformComponent } from './forms/templateform.component';
/**
 * > In Angular your code is structured into packages called Angular Modules, or NgModules for short.
 *   Every app requires at least one module, the root module, that we call AppModule by convention
 * > To define an Angular Module we first create a class and then annotate it with a decorator called @NgModule.
 */
@NgModule({
  /**
   * The list of components or directives belonging to this module.
   */
  declarations: [
    AppComponent,
    JokeComponent,
    JokelistComponent,
    HomeComponent,
    JokeformComponent,
    HeaderComponent,
    BasicComponent,
    CardHoverDirective,
    FormsComponent,
    DefaultPipe,
    ModelformComponent,
    ReactivemodelformComponent,
    TemplateformComponent
  ],
  /**
   * The other Angular Modules that export material we need in this Angular Module. Almost every
   * application’s root module should import the BrowserModule.
   */
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    AppRoutingModule,
    TabsModule.forRoot()
  ],
  providers: [],
  /**
   * Identifies the root component that Angular should bootstrap when it starts the application.
   */
  bootstrap: [AppComponent]
})
export class AppModule { }
