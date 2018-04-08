import {Injectable, NgZone} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

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

  constructor(private http: HttpClient, private authService: AuthService, private zone: NgZone) {
    window.player;
    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log(this.authService.user);
      if (this.authService.user) {
        window.player = new window.Spotify.Player({
          name: 'Music Player Web App',
          getOAuthToken: callback => {
            // Run code to get a fresh access token
            this.authService.getNewAccessToken().subscribe((res: {access_token}) => {
              callback(res.access_token);
            });
            // For development - so you can develop in NG cli instead of express server
            // callback(this.authService.user.access_token);
          },
          volume: 1
        });

        // Connect to the player!
        window.player.connect().then(success => {
          console.log("Player connected successfully");
        });

        window.player.addListener('player_state_changed', (state: any) => {
          this.zone.run(() =>this.playerState.next(state));
        });
      }
    }
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

  getPlayerState(): Observable<any> {
    return this.playerState.asObservable();
  }

}
