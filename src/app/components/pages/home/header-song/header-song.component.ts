import { Component, OnInit } from '@angular/core';
import {PlaybackSdkService} from '../../../../services/playback-sdk.service';

@Component({
  selector: 'app-header-song',
  templateUrl: './header-song.component.html',
  styleUrls: ['./header-song.component.scss']
})
export class HeaderSongComponent implements OnInit {

  playerState: any;

  constructor(private playbackSDKService: PlaybackSdkService) { }

  ngOnInit() {
    this.playbackSDKService.getPlayerState().subscribe(state => {
      this.playerState = state;
    });
  }

}
