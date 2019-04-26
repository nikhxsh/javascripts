import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JokelistComponent } from './joke/jokelist.component';
import { HomeComponent } from './home/home.component';
import { BasicComponent } from './basic/basic.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'jokes', component: JokelistComponent },
  { path: 'ngfor', component: BasicComponent },
  { path: 'rxjs', component: RxjsComponent },
  { path: '**', component: HomeComponent } //catch all route by using the path **
];
/**
 * We then install these routes into our application by importing RouterModule.forRoot(routes) into
 * our NgModule, like so:
 * We need to add a directive called router-outlet somewhere in our template HTML. This directive
 * tells Angular where it should insert each of those components in the route, we’ll add ours to the
 * AppComponent,
 */
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
