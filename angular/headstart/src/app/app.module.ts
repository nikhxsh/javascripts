import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JokeComponent } from './joke/joke.component';
import { JokelistComponent } from './joke/jokelist.component';
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
import { ChildComponent } from './providers/child.component';
import { ParentComponent } from './providers/parent.component';
import { SimpleService } from './services/simple.service';
import { HolderComponent } from './providers/holder.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { SearchService } from './services/search.service';
import { ArtistComponent } from './itunes/artist.component';
import { ItuneSearchComponent } from './itunes/itune-search.component';
import { ArtistTrackListComponent } from './itunes/artist-track-list.component';
import { ArtistAlbumListComponent } from './itunes/artist-album-list.component';
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
    ArtistComponent,
    ItuneSearchComponent,
    ArtistTrackListComponent,
    ArtistAlbumListComponent
  ],
  /**
   * The other Angular Modules that export material we need in this Angular Module. Almost every
   * application’s root module should import the BrowserModule.
   */
  imports: [
    BrowserModule,
    FormsModule, 
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    AppRoutingModule,
    TabsModule.forRoot()
  ],
  /**
   * > providers which accepts a list of providers exactly the same as we would pass to the ReflectiveInjector via the 
   * resolveAndCreate function
   * > We can also configure our Components and Directives the same way using a property called providers on the Component 
   * and Directive decorators, like so:
   *  @Component({
   *    selector: 'my-comp',
   *    template: `...`,
   *    providers: [EmailService]
   *  })
   * > This creates a child injector who’s parent injector is the injector on the parent component. If there is
   * no parent component then the parent injector is the top level NgModule injector.
   * > With components we have another property called viewProviders which creates a special injector that resolves 
   * dependencies only for this components view children and doesn’t act as a parent injector for any content children
   *  @Component({
   *    selector: 'my-comp',
   *    template: `...`,
   *    viewProviders: [EmailService]
   *  })
   */
  providers: [
    SimpleService,
    SearchService
  ],
  /**
   * Identifies the root component that Angular should bootstrap when it starts the application.
   */
  bootstrap: [AppComponent]
})
export class AppModule { }
