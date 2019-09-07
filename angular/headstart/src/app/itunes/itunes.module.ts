import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ITuneRoutingModule } from './itunes-routing.module';

import { ArtistComponent } from './artist.component';
import { ItuneSearchComponent } from './itune-search.component';
import { ArtistTrackListComponent } from './artist-track-list.component';
import { ArtistAlbumListComponent } from './artist-album-list.component';

@NgModule({
    declarations: [
        ArtistComponent,
        ItuneSearchComponent,
        ArtistTrackListComponent,
        ArtistAlbumListComponent  
    ],
    imports: [    
        CommonModule,
        ITuneRoutingModule
    ]
})
export class ItuneModule { }