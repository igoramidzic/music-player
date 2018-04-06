import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AudioService {

  audio = new Audio();

  constructor() {
    this.audio.src = 'assets/songs/city-of-stars.mp3';
    this.audio.load();
  }

  toggleAudio () {
    if (this.audio.paused)
        return this.play();
    return this.pause();
  }

  play () {
    this.audio.play();
  }

  pause () {
    this.audio.pause();
  }

  nextSong () {
    // ..
  }

  previousSong () {
    // ..
  }

}
