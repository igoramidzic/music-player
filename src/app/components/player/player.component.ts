import {Component, OnInit} from '@angular/core';
import {PlaybackSdkService} from '../../services/playback-sdk.service';
import {SimpleTimer} from 'ng2-simple-timer';
import {PlaybackDeviceService} from '../../services/playback-device.service';

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

  constructor(private playbackSDKService: PlaybackSdkService, private st: SimpleTimer,
              public playbackDeviceService: PlaybackDeviceService) { }

  ngOnInit() {
    this.st.newTimer('1sec',1);
    this.playbackSDKService.$playerState.subscribe(state => {
      this.playerState = state;
      if (this.playerState)
        this.currentPosition = this.playerState.position;
      this.toggleTimer();
      console.log(state);
    });
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
    // ..
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
