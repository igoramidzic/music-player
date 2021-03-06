import {Injectable, NgZone} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {PlaybackDeviceService} from './playback-device.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    spotifyReady: Promise<void>;
    Spotify: any;
    player: any;
  }
}

@Injectable()
export class PlaybackSdkService {

  public $playerState: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private authService: AuthService, private zone: NgZone,
              private playbackDeviceService: PlaybackDeviceService) {
    window.onSpotifyWebPlaybackSDKReady = () => {
      this.authService.$user.subscribe(user => {
        if (user && !window.player && user.product == 'premium')
          this.createPlayerConnection();
      })
    }
  }

  createPlayerConnection () {
    window.player = new window.Spotify.Player({
      name: 'Music Player Web App',
      getOAuthToken: callback => {
        // // Run code to get a fresh access token
        // this.authService.getNewAccessToken().subscribe((res: {access_token}) => {
        //   callback(res.access_token);
        // });
        // For development - so you can develop in NG cli instead of express server
        callback(this.authService.user.access_token);
      },
      volume: 1
    });

    // Connect to the player!
    window.player.connect().then(success => {
      setTimeout(() => {
        this.playbackDeviceService.updateAvailableDevices();
      },1000);
    });

    window.player.addListener('player_state_changed', (state: any) => {
      this.zone.run(() => {
        this.$playerState.next(state);
        // temporary solution to bug where updateAvailableDevices is executed
        // when user logs out or is unauthenticated by Spotify.
        if (this.authService.user) {
          this.playbackDeviceService.updateAvailableDevices();
        }
      });
    });
  }

  togglePlayback () {
    return window.player.togglePlay()
  }

  nextTrack () {
    return window.player.nextTrack()
  }

  previousTrack () {
    return window.player.previousTrack();
  }

  favoriteTrack () {

  }

  toggleShuffle (state) {
    return this.http.put('https://api.spotify.com/v1/me/player/shuffle?state=' + state, {}, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.user.access_token
      })
    });
  }

  seekToPosition (position_ms) {
    return this.http.put('https://api.spotify.com/v1/me/player/seek?position_ms=' + position_ms, {}, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.user.access_token
      })
    });
  }

}
