import { Injectable } from '@angular/core';
import {PlaybackSdkService} from './playback-sdk.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class FavoritesService {

  playerState: any;
  $isFavorited: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor(private playbackSDKService: PlaybackSdkService, private http: HttpClient,
              private authService: AuthService) {
    this.playbackSDKService.$playerState.subscribe(state => {
      this.playerState = state;
      if (state) {
        this.fetchTrackIsFavorited(this.playerState.track_window.current_track.id)
          .subscribe(res => {
            this.$isFavorited.next(res[0]);
          })
      }
    });
  }

  saveToFavorites (track_id) {
    return this.http.put('https://api.spotify.com/v1/me/tracks?ids=' + track_id, {}, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.user.access_token
      })
    })
  }

  removeFromFavorites (track_id) {
    return this.http.delete('https://api.spotify.com/v1/me/tracks?ids=' + track_id, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.user.access_token
      })
    })
  }

  fetchTrackIsFavorited (track_ids) {
    return this.http.get('https://api.spotify.com/v1/me/tracks/contains?ids=' + track_ids, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.user.access_token
      })
    })
  }

}
