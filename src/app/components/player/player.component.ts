import {Component, OnInit} from '@angular/core';
import {PlaybackSdkService} from '../../services/playback-sdk.service';
import {SimpleTimer} from 'ng2-simple-timer';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  playerState: any;
  currentPosition: number = 0;
  currentSliderPosition: number;
  playing: boolean = false;
  timer;

  constructor(private playbackSDKService: PlaybackSdkService, private st: SimpleTimer) { }

  ngOnInit() {
    this.st.newTimer('1sec',1);
    this.playbackSDKService.getPlayerState().subscribe(state => {
      this.playerState = state;
      this.currentPosition = this.playerState.position;
      this.toggleTimer();
    });
  }

  toggleTimer () {
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
    this.playbackSDKService.seekToPosition(position_md)
      .subscribe();
  }

  onFavorite () {
    // ..
  }

}
