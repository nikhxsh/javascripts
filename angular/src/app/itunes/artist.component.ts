import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'artist',
	templateUrl: './artist.component.html'
})
export class ArtistComponent implements OnInit {
	artist: any
	constructor(private searchService: SearchService,
		private route: ActivatedRoute) { }

	ngOnInit() {
		this.get();
	}

	get() {
		this.route.params.subscribe(params => {
			let artistId = params['artistId'];
			if (artistId)
				this.searchService.getArtist(params['artistId'])
					.subscribe(result => {
						this.artist = result;
					})
		})
	}
}
