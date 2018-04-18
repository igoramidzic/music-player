import {Component, OnInit} from '@angular/core';
import {PlaybackSdkService} from '../../services/playback-sdk.service';
import {SimpleTimer} from 'ng2-simple-timer';
import {PlaybackDeviceService} from '../../services/playback-device.service';
import {FavoritesService} from '../../services/favorites.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  playerState: any;
  currentPosition: number = 0;
  playing: boolean = false;
  timer;
  isFavorited: boolean;

  constructor(private playbackSDKService: PlaybackSdkService, private st: SimpleTimer,
              public playbackDeviceService: PlaybackDeviceService,
              public favoritesService: FavoritesService) { }

  ngOnInit() {
    this.st.newTimer('1sec',1);
    this.playbackSDKService.$playerState.subscribe(state => {
      this.playerState = state;
      if (this.playerState) {
        this.currentPosition = this.playerState.position;
      }
      this.toggleTimer();
    });

    this.favoritesService.$isFavorited.subscribe(res => {
      if (res != null) {
        this.isFavorited = res;
      }
    })
  }

  toggleTimer () {
    if (this.playerState) {
      if (this.playerState.paused) {
        this.playing = false;
        this.st.unsubscribe(this.timer);
      } else {
        if (!this.playing) {
          this.playing = true;
          let firstFrame;
          this.timer = this.st.subscribe('1sec', () => {
            if (firstFrame) {
              this.currentPosition += 1000;
            }
            firstFrame = true;
          });
        }
      }
    } else {
      this.playing = false;
      this.st.unsubscribe(this.timer);
    }
  }

  onTogglePlayback () {
    this.playbackSDKService.togglePlayback();
  }

  onNextTrack () {
    this.playbackSDKService.nextTrack();
  }

  onPreviousTrack () {
    this.playbackSDKService.previousTrack();
  }

  onSeekPositionOnCurrentTrack (position_md) {
    if (this.playerState) {
      this.playbackSDKService.seekToPosition(position_md)
        .subscribe();
    }
  }

  onFavorite () {
    let track_id = this.playerState.track_window.current_track.id;
    this.favoritesService.saveToFavorites(track_id)
      .subscribe(() => {
        this.favoritesService.fetchTrackIsFavorited(track_id)
          .subscribe(res => {
            this.favoritesService.$isFavorited.next(res[0]);
          })
      });
  }

  onRemoveFavorite () {
    let track_id = this.playerState.track_window.current_track.id;
    this.favoritesService.removeFromFavorites(track_id)
      .subscribe(() => {
        this.favoritesService.fetchTrackIsFavorited(track_id)
          .subscribe(res => {
            this.favoritesService.$isFavorited.next(res[0]);
          })
      });
  }

  onToggleFavorite () {
    if (this.isFavorited) {
      this.onRemoveFavorite();
    } else {
      this.onFavorite();
    }
  }

  onToggleShuffle () {
    if (this.playerState) {
      this.playbackSDKService.toggleShuffle(!this.playerState.shuffle)
        .subscribe();
    }
  }

  transferPlaybackToThisDevice () {
    this.playbackDeviceService.setPlaybackDevice(this.playbackDeviceService.thisDevice.id)
      .subscribe();
  }

}
