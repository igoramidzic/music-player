import { Component, OnInit } from '@angular/core';
import {AudioService} from '../../services/audio.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  audioLength: number;
  audioProgress: number;
  playing: boolean;
  currentSong: string;

  constructor(private audioService: AudioService) { }

  ngOnInit() {
    this.audioLength = 194;
    this.audioProgress = 0;
    this.playing = false;

    this.currentSong = this.audioService.currentSong;

    this.audioService.currentSong$.subscribe(song => {
      console.log(song);
    })

  }

  onTogglePlay () {
    this.playing = !this.playing;
  }

  onSeekBack () {
    // ..
  }

  onSeekForward () {
    // ..
    this.audioService.nextSong();
  }

  onFavorite () {
    // ..
  }

  onToggleShuffle () {
    // ..
  }

}
