import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgrxstoreComponent } from './ngrxstore/ngrxstore.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DatePipe, CurrencyPipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JokeComponent } from './joke/joke.component';
import { JokelistComponent } from './joke/jokelist.component';
import { JokeformComponent } from './joke/jokeform.component';
import { HeaderComponent } from './_ui/header.component';
import { BasicComponent } from './basic/basic.component';
import { CardHoverDirective } from './directives/card-hover.directive';
import { FormsComponent } from './forms/forms.component';
import { DefaultPipe } from './pipes/default.pipe';
import { ModelformComponent } from './forms/modelform.component';
import { ReactivemodelformComponent } from './forms/reactivemodelform.component';
import { TemplateformComponent } from './forms/templateform.component';
import { ChildComponent } from './providers/child.component';
import { ParentComponent } from './providers/parent.component';
import { SimpleService } from './services/simple.service';
import { HolderComponent } from './providers/holder.component';
import { SearchService } from './services/search.service';
import { LoginComponent } from './_ui/login.component';
import { AuthService } from './services/auth.service';
import { appReducers } from './ngrxstore/reducers/app.reducers';
import { AccountEffects } from './ngrxstore/effects/account.effects';
import { AccountService } from './services/account.service';
import { APIInterceptor } from './services/api.interceptor';
import { AuthGuard } from './services/authguard';
import { WineryService } from './services/winery.service';
import { WineryComponent } from './winery/winery.component';
import { NgDataGridModule } from 'ngdatagrid';
import { NgModelformModule } from 'ngmodelform';

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
		JokeformComponent,
		HeaderComponent,
		BasicComponent,
		CardHoverDirective,
		FormsComponent,
		DefaultPipe,
		ModelformComponent,
		ReactivemodelformComponent,
		TemplateformComponent,
		ChildComponent,
		ParentComponent,
		HolderComponent,
		LoginComponent,
		NgrxstoreComponent,
		WineryComponent
	],
	/**
	 * The other Angular Modules that export material we need in this Angular Module. Almost every
	 * application’s root module should import the BrowserModule.
	 */
	imports: [
		//When you want to run your app in a browser
		BrowserModule,
		//When you want to talk to a server
		HttpClientModule,
		HttpClientJsonpModule,
		//When you want to build template driven forms
		FormsModule,
		//When you want to build reactive forms
		ReactiveFormsModule,
		StoreModule.forRoot(appReducers),
		EffectsModule.forRoot([AccountEffects]),
		StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
		AppRoutingModule,
		NgDataGridModule,
		NgModelformModule,
		ModalModule.forRoot(),
		TabsModule.forRoot()
	],
	/**
	 * > A provider is an instruction to the Dependency Injection system on how to obtain a value for a dependency. 
	 *   Most of the time, these dependencies are services that you create and provide.
	 * > When you register a provider with a specific NgModule, the same instance of a service is available to all 
	 *   components in that NgModule.
	 * > When you register a provider at the component level, you get a new instance of the service with each new 
	 *   instance of that component. At the component level, register a service provider in the providers property 
	 *   of the @Component() metadata.
	  *  @Component({
	 *    selector: 'my-comp',
	 *    template: `...`,
	 *    viewProviders: [AuthService]
	 *  })
	 * > This creates a child injector who’s parent injector is the injector on the parent component. If there is
	 *   no parent component then the parent injector is the top level NgModule injector.
	 * > With components we have another property called viewProviders which creates a special injector that resolves 
	 *   dependencies only for this components view children and doesn’t act as a parent injector for any content 
	 *   children
	 *   @Component({
	 *     selector: 'my-comp',
	 *     template: `...`,
	 *     viewProviders: [AuthService]
	 *   })
	 */
	providers: [
		DatePipe,
		CurrencyPipe,
		SimpleService,
		SearchService,
		AuthService,
		AccountService,
		AuthGuard,
		WineryService,
		//Intercepts and handles an HttpRequest or HttpResponse.
		{
			provide: HTTP_INTERCEPTORS,
			useClass: APIInterceptor,
			multi: true
		}
	],
	/**
	 * Identifies the root component that Angular should bootstrap when it starts the application.
	 */
	bootstrap: [AppComponent]
})
export class AppModule { }
