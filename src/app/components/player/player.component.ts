import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  audioLength: number;
  audioProgress: number;
  playing: boolean;

  constructor() { }

  ngOnInit() {
    this.audioLength = 194;
    this.audioProgress = 0;
    this.playing = false;
  }

  onTogglePlay () {
    this.playing = !this.playing;
  }

  onSeekBack () {
    // ..
  }

  onSeekForward () {
    // ..
  }

  onFavorite () {
    // ..
  }

  onToggleShuffle () {
    // ..
  }

}
