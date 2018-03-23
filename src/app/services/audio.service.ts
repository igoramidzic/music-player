import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AudioService {

  audio = new Audio();

  constructor() {
    // this.songs = [
    //   { name: 'Golden Sands', artist: 'Imagine Dragons', albumCoverUrl: 'evolve-album.jpg', audioSrc: 'assets/songs/city-of-stars.mp3' },
    //   { name: 'Thunder', artist: 'Imagine Dragons', albumCoverUrl: 'i-d-album.jpg', audioSrc: 'assets/songs/walking-the-wire.mp3' },
    //   { name: 'Tragic Endings', artist: 'Eminem', albumCoverUrl: 'revival.png', audioSrc: 'assets/songs/city-of-stars.mp3' },
    //   { name: 'Until You Were Gone', artist: 'The Chainsmokers', albumCoverUrl: 't-c-album.jpg', audioSrc: 'assets/songs/walking-the-wire.mp3' },
    //   { name: 'City of Stars', artist: 'Logic', albumCoverUrl: 'logic.jpg', audioSrc: 'assets/songs/city-of-stars.mp3' },
    //   { name: 'Walking The Wire', artist: 'Imagine Dragons', albumCoverUrl: 'i-d-album-2.jpg', audioSrc: 'assets/songs/walking-the-wire.mp3' }
    // ];

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
