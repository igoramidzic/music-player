import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AudioService {

  songs: Song[];
  currentSong: string = 'Hello, brother';
  currentSong$: Subject = new Subject();

  constructor() {
    this.songs = [
      { name: 'Golden Sands', artist: 'Imagine Dragons', albumCoverUrl: 'evolve-album.jpg', audioUrl: '' },
      { name: 'Thunder', artist: 'Imagine Dragons', albumCoverUrl: 'i-d-album.jpg', audioUrl: '' },
      { name: 'Tragic Endings', artist: 'Eminem', albumCoverUrl: 'revival.png', audioUrl: '' },
      { name: 'Until You Were Gone', artist: 'The Chainsmokers', albumCoverUrl: 't-c-album.jpg', audioUrl: '' },
      { name: 'The Incredible True Story', artist: 'Logic', albumCoverUrl: 'logic.jpg', audioUrl: '' },
      { name: 'Believer', artist: 'Imagine Dragons', albumCoverUrl: 'i-d-album-2.jpg', audioUrl: '' }
    ];

    this.currentSong$.next('Hello world!');
  }

  nextSong () {
    this.currentSong$.next('Next');
  }

}

interface Song {
  name: string,
  artist: string,
  albumCoverUrl: string,
  audioUrl: string
}
