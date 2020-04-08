import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../services/search.service';
import { Track } from './searchitem';

@Component({
  selector: 'artist-track-list',
  templateUrl: './artist-track-list.component.html'
})
export class ArtistTrackListComponent implements OnInit {
  tracks: Track[];
  constructor(private searchService: SearchService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.get();
  }

  get() {
    this.route.parent.params.subscribe(params => {
      let artistId = params['artistId'];
      if (artistId)
        this.searchService.getArtistTrackList(artistId)
          .subscribe(result => {
            this.tracks = result.map( track => new Track(       
              track.artistId,
              track.trackId, 
              track.trackName, 
              track.artworkUrl60,
              track.trackViewUrl,
              track.releaseDate          
            ));
          })
    })
  }
}
