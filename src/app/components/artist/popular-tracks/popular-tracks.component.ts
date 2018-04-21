import {Component, Input, OnInit} from '@angular/core';
import {PlaybackSdkService} from '../../../services/playback-sdk.service';
import {TrackService} from '../../../services/track.service';
import {FavoritesService} from '../../../services/favorites.service';

@Component({
  selector: 'app-popular-tracks',
  templateUrl: './popular-tracks.component.html',
  styleUrls: ['./popular-tracks.component.scss']
})
export class PopularTracksComponent implements OnInit {

  playerState: any;
  @Input('popularTracks') popularTracks;

  constructor(private playbackSdkService: PlaybackSdkService, private trackService: TrackService,
              private favoritesService: FavoritesService) { }

  ngOnInit() {
    this.playbackSdkService.$playerState.subscribe(state => {
      this.playerState = state;
    });

    this.updateAllTracksAreFavorited();
  }

  onSetTrackToPlay (track_uri) {
    this.trackService.playTrack([track_uri])
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
    this.popularTracks.forEach((track) => {
      track_ids.push(track.id);
    });

    let track_ids_string = track_ids.join(',');
    this.favoritesService.fetchTrackIsFavorited(track_ids_string)
      .subscribe(res => {
        this.popularTracks.forEach((track, i) => {
          track.is_favorited = res[i];
        })
      })
  }

  onUpdateFavoritedTrack (track_id, index) {
    if (this.popularTracks[index].is_favorited) {
      this.favoritesService.removeFromFavorites(track_id)
        .subscribe(() => {
          this.popularTracks[index].is_favorited = false;
        });
    } else {
      this.favoritesService.fetchTrackIsFavorited(track_id)
        .subscribe(res => {
          this.popularTracks[index].is_favorited = res[0];
        });
    }
  }

}
