import {Component, Input, OnInit} from '@angular/core';
import {PlaybackSdkService} from '../../../services/playback-sdk.service';
import {FavoritesService} from '../../../services/favorites.service';
import {AlbumService} from '../../../services/album.service';

@Component({
  selector: 'app-tracks-list',
  templateUrl: './tracks-list.component.html',
  styleUrls: ['./tracks-list.component.scss']
})
export class TracksListComponent implements OnInit {

  @Input('album') album: any;
  playerState: any;
  public static updateAllTracksAreFavorited: any;

  constructor(private playbackSdkService: PlaybackSdkService,
              private favoritesService: FavoritesService,
              private albumService: AlbumService) {

  }

  ngOnInit() {
    this.playbackSdkService.$playerState.subscribe(state => {
      this.playerState = state;
    });

    this.updateAllTracksAreFavorited();
  }

  onSetTrackToPlay (offset) {
    this.albumService.playAlbum(this.album.uri, offset)
      .subscribe();
  }

  onTogglePlayback () {
    this.playbackSdkService.togglePlayback();
  }

  updateAllTracksAreFavorited () {
    let track_ids = [];
    this.album.tracks.items.forEach((track) => {
      track_ids.push(track.id);
    });

    let track_ids_string = track_ids.join(',');
    this.favoritesService.fetchTrackIsFavorited(track_ids_string)
      .subscribe(res => {
        this.album.tracks.items.forEach((track, i) => {
          track.is_favorited = res[i];
        })
      })
  }

  onUpdateFavoritedTrack (track_id, index) {
    if (this.album.tracks.items[index].is_favorited) {
      this.favoritesService.removeFromFavorites(track_id)
        .subscribe(res => {
          this.album.tracks.items[index].is_favorited = false;
        });
    } else {
      this.favoritesService.fetchTrackIsFavorited(track_id)
        .subscribe(res => {
          this.album.tracks.items[index].is_favorited = res[0];
        });
    }
  }

  onSaveToFavorites (track_id, index) {
    this.favoritesService.saveToFavorites(track_id)
      .subscribe(() => {
        this.onUpdateFavoritedTrack(track_id, index);
      });
  }

}


