import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JokelistComponent } from './joke/jokelist.component';
import { BasicComponent } from './basic/basic.component';
import { FormsComponent } from './forms/forms.component';
import { HolderComponent } from './providers/holder.component';
import { ArtistComponent } from './itunes/artist.component';
import { ArtistTrackListComponent } from './itunes/artist-track-list.component';
import { ArtistAlbumListComponent } from './itunes/artist-album-list.component';
import { ItuneSearchComponent } from './itunes/itune-search.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'jokes', component: JokelistComponent },
  { path: 'jokes', component: JokelistComponent },
  { path: 'ngfor', component: BasicComponent },
  //parameterised route (Non-parameterised routes take precedence over parameterised routes.)
  { path: 'ngfor/:id', component: BasicComponent },
  { path: 'forms', component: FormsComponent },
  { path: 'providers', component: HolderComponent },
  { path: 'itunes', 
    component: ItuneSearchComponent,
    children: [  
        {
          path: 'artist/:artistId', component: ArtistComponent,
          children: [
            { path: '', redirectTo: 'tracks', pathMatch: 'full' },
            { path: 'tracks', component: ArtistTrackListComponent },
            { path: 'albums', component: ArtistAlbumListComponent },
          ]
        }
    ]   
  },
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
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
