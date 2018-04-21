import { Component, OnInit } from '@angular/core';
import {FavoritesService} from '../../../services/favorites.service';
import {TrackService} from '../../../services/track.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  tracks: any;

  constructor(private favoritesService: FavoritesService,
              private trackService: TrackService) { }

  ngOnInit() {
    this.favoritesService.fetchFavorites(0, 50)
      .subscribe((tracks: {items}) => {
        this.tracks = tracks.items;
      })
  }

  onSetTrackToPlay () {
    let track_uris = [];

    for (let i = 0; i < this.tracks.length; i++) {
      track_uris.push(this.tracks[i].track.uri);
    }

    this.trackService.playTrack(track_uris)
      .subscribe();
  }

}
