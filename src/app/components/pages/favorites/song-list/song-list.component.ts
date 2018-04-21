import {Component, Input, OnInit} from '@angular/core';
import {PlaybackSdkService} from '../../../../services/playback-sdk.service';
import {TrackService} from '../../../../services/track.service';
import {FavoritesService} from '../../../../services/favorites.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {

  @Input('tracks') tracks;
  playerState: any;


  constructor(private playbackSdkService: PlaybackSdkService, private trackService: TrackService,
              private favoritesService: FavoritesService) {
    this.playbackSdkService.$playerState.subscribe(state => {
      this.playerState = state;
    })
  }

  ngOnInit() {
    this.updateAllTracksAreFavorited();
  }

  onSetTrackToPlay (index) {
    let track_uris = [];

    for (let i = index; i < this.tracks.length; i++) {
      track_uris.push(this.tracks[i].track.uri);
    }

    this.trackService.playTrack(track_uris)
      .subscribe();
  }

  onTogglePlayback () {
    this.playbackSdkService.togglePlayback();
  }

  onSaveToFavorites (track_id, index) {
    this.favoritesService.saveToFavorites(track_id)
      .subscribe(() => {
        this.onUpdateFavoritedTrack(track_id, index);
      })
  }

  updateAllTracksAreFavorited () {
    let track_ids = [];
    this.tracks.forEach((trackItem) => {
      track_ids.push(trackItem.track.id);
    });

    let track_ids_string = track_ids.join(',');
    this.favoritesService.fetchTrackIsFavorited(track_ids_string)
      .subscribe(res => {
        this.tracks.forEach((track, i) => {
          track.is_favorited = res[i];
        })
      })
  }

  onUpdateFavoritedTrack (track_id, index) {
    if (this.tracks[index].is_favorited) {
      this.favoritesService.removeFromFavorites(track_id)
        .subscribe(res => {
          this.tracks.splice(index, 1);
        });
    } else {
      this.favoritesService.fetchTrackIsFavorited(track_id)
        .subscribe(res => {
          this.tracks[index].is_favorited = res[0];
        });
    }
  }

}
