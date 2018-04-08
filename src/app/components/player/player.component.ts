import {Component, OnInit, ViewChild} from '@angular/core';
import {AudioService} from '../../services/audio.service';
import {PlaybackSdkService} from '../../services/playback-sdk.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  playerState: any;

  constructor(private playbackSDKService: PlaybackSdkService) {
    this.playbackSDKService.getPlayerState().subscribe(state => {
      this.playerState = state;
      console.log(this.playerState);
    });
  }

  ngOnInit() {
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

  onFavorite () {
    // ..
  }

}
