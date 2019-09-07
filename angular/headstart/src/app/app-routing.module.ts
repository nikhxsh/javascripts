import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; //When you want to use RouterLink, .forRoot(), and .forChild()
import { JokelistComponent } from './joke/jokelist.component';
import { BasicComponent } from './basic/basic.component';
import { FormsComponent } from './forms/forms.component';
import { HolderComponent } from './providers/holder.component';
import { NgrxstoreComponent } from './ngrxstore/ngrxstore.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'jokes', component: JokelistComponent },
  { path: 'jokes', component: JokelistComponent },
  { path: 'ngfor', component: BasicComponent },
  //parameterised route (Non-parameterised routes take precedence over parameterised routes.)
  { path: 'ngfor/:id', component: BasicComponent },
  { path: 'forms', component: FormsComponent },
  { path: 'providers', component: HolderComponent },
  //Lazy Loading using feature module
  { 
    path: 'itunes',   
    //Angular 7
    //loadChildren: './itunes/itunes.module#ItuneModule' 
    //Angular 8
    loadChildren: () => import('./itunes/itunes.module').then(module => module.ItuneModule)
  },
  { path: 'ngrx', component: NgrxstoreComponent },
  { path: '**', component: JokelistComponent } //catch all route by using the path **
];
/**
 * We then install these routes into our application by importing RouterModule.forRoot(routes) into
 * our NgModule, like so:
 * We need to add a directive called router-outlet somewhere in our template HTML. This directive
 * tells Angular where it should insert each of those components in the route, we’ll add ours to the
 * AppComponent,
 */
@NgModule({
  /**
   * The method is called forRoot() because you configure the router at the application's root level. 
   * The forRoot() method supplies the service providers and directives needed for routing, and performs 
   *  the initial navigation based on the current browser URL.
   */
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  //For submodules and lazy loaded submodules the module should be used as follows: forChild creates a module that 
  //contains all the directives and the given routes, but does not include the router service.
  exports: [RouterModule] //exports RouterModule so it will be available throughout the app.
})
export class AppRoutingModule { }
