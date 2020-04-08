import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../services/search.service';
import { Album } from './searchitem';

@Component({
  selector: 'artist-album-list',
  templateUrl: './artist-album-list.component.html'
})
export class ArtistAlbumListComponent implements OnInit {
  albums: Album[];

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
        this.searchService.getArtistAlbumList(params['artistId'])
          .subscribe(result => {
            this.albums = result.map(album => new Album(
              album.artistId,
              album.artworkUrl60,
              album.collectionName,
              album.collectionViewUrl,
              album.releaseDate
            ));
          })
    })
  }
}
