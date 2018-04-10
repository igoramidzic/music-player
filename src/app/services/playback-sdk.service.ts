import {Injectable, NgZone} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {PlaybackDeviceService} from './playback-device.service';

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

  private playerState = new Subject<any>();

  constructor(private http: HttpClient, private authService: AuthService, private zone: NgZone,
              private playbackDeviceService: PlaybackDeviceService) {
    window.player;
    window.onSpotifyWebPlaybackSDKReady = () => {

      if (this.authService.user) {
        this.createPlayerConnection();
      }

      this.authService.getUser().subscribe(() => {
        this.createPlayerConnection();
      });

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
      console.log("Player connected successfully");
      setTimeout(() => {
        this.playbackDeviceService.updateAvailableDevices();
      },750);
    });

    window.player.addListener('player_state_changed', (state: any) => {
      this.zone.run(() => {
        this.playerState.next(state);
        this.playbackDeviceService.updateAvailableDevices();
      });
      console.log(state);
    });
  }

  togglePlayback () {
    window.player.togglePlay().then(() => {
      console.log('Toggled playback!');
    });
  }

  nextTrack () {
    window.player.nextTrack().then(() => {
      console.log('Skipped to next track!');
    });
  }

  previousTrack () {
    window.player.previousTrack().then(() => {
      console.log('Set to previous track!');
    });
  }

  favoriteTrack () {

  }

  seekToPosition (position_ms) {
    return this.http.put('https://api.spotify.com/v1/me/player/seek?position_ms=' + position_ms, {}, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.user.access_token
      })
    });
  }

  getPlayerState(): Observable<any> {
    return this.playerState.asObservable();
  }

}
