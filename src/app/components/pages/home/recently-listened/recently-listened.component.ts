import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recently-listened',
  templateUrl: './recently-listened.component.html',
  styleUrls: ['./recently-listened.component.scss']
})
export class RecentlyListenedComponent implements OnInit {

  recentlyPlayed: { name: String, artist: String, url: String }[];

  constructor() { }

  ngOnInit() {
    this.recentlyPlayed = [
      { name: 'Golden Sands', artist: 'Imagine Dragons', url: 'evolve-album.jpg' },
      { name: 'Thunder', artist: 'Imagine Dragons', url: 'i-d-album.jpg' },
      { name: 'Tragic Endings', artist: 'Eminem', url: 'revival.png' },
      { name: 'Until You Were Gone', artist: 'The Chainsmokers', url: 't-c-album.jpg' },
      { name: 'The Incredible True Story', artist: 'Logic', url: 'logic.jpg' },
      { name: 'Believer', artist: 'Imagine Dragons', url: 'i-d-album-2.jpg' }
    ]
  }

}
