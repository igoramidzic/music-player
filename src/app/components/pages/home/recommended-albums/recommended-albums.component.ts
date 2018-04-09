import { Component, OnInit } from '@angular/core';
import {TopArtistsAndTracksService} from '../../../../services/top-artists-and-tracks.service';

@Component({
  selector: 'app-recommended-albums',
  templateUrl: './recommended-albums.component.html',
  styleUrls: ['./recommended-albums.component.scss']
})
export class RecommendedAlbumsComponent implements OnInit {

  topArtistsList: any[];
  topTracksList: any[];

  constructor(private topAristsAndTracksService: TopArtistsAndTracksService) { }

  ngOnInit() {
    this.topAristsAndTracksService.getTopArists().subscribe(artists => {
      this.topArtistsList = artists.items;
    });

    this.topAristsAndTracksService.getTopTracks().subscribe(tracks => {
      this.topTracksList = tracks.items;
    })
  }

}
