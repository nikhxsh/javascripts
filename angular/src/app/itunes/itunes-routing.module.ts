import { Routes, RouterModule } from "@angular/router";
import { ArtistComponent } from './artist.component';
import { ArtistTrackListComponent } from './artist-track-list.component';
import { ArtistAlbumListComponent } from './artist-album-list.component';
import { NgModule } from '@angular/core';
import { ItuneSearchComponent } from './itune-search.component';

const routes: Routes = [
	{ path: '', component: ItuneSearchComponent },
	{
		path: 'artist/:artistId',
		component: ArtistComponent,
		children:
			[
				{ path: '', redirectTo: 'tracks', pathMatch: 'full' },
				{ path: 'tracks', component: ArtistTrackListComponent },
				{ path: 'albums', component: ArtistAlbumListComponent },
				{ path: 'back', redirectTo: '/itunes', pathMatch: 'full' },
			]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ITuneRoutingModule { }