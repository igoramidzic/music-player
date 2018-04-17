import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ArtistService} from '../../services/artist.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  artist: any;
  artistAlbums: any;
  popularTracks: any;
  relatedArtists: any;

  constructor(private artistService: ArtistService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['artist_id']) {
        this.artistService.fetchArtistById(params['artist_id'])
          .subscribe(artist => {
            console.log(artist);
            this.artist = artist;
          });

        this.artistService.fetchArtistsAlbums(params['artist_id'], 20, 0)
          .subscribe(albums => {
            console.log(albums);
            this.artistAlbums = albums;
          });

        this.artistService.fetchArtistsTopTracks(params['artist_id'])
          .subscribe(popularTracks => {
            console.log(popularTracks);
            this.popularTracks = popularTracks.tracks;
          });

        this.artistService.fetchArtistsRelatedArtists(params['artist_id'])
          .subscribe(relatedArtists => {
            console.log(relatedArtists);
            this.relatedArtists = relatedArtists.artists.splice(0, 7);

          });

      }
    })
  }

}
