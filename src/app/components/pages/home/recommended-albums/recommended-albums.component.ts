import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recommended-albums',
  templateUrl: './recommended-albums.component.html',
  styleUrls: ['./recommended-albums.component.scss']
})
export class RecommendedAlbumsComponent implements OnInit {

  recommendedAlbums: { name: string, artist: string, url: string }[];

  constructor() { }

  ngOnInit() {
    this.recommendedAlbums = [
      { name: 'Evolve', artist: 'Imagine Dragons', url: 'i-d-album.jpg' },
      { name: 'The Incredible True Story', artist: 'Logic', url: 'logic.jpg' },
      { name: 'Revival', artist: 'Eminem', url: 'revival.png' },
      { name: 'There\'s Really a Wolf', artist: 'Russ', url: 'russ.jpg' },
      { name: 'Stoney', artist: 'Post Malone', url: 'stoney.jpg' },
      { name: 'The Life of Pablo', artist: 'Kanye West', url: 'life-of-pablo.jpg' },
    ];
  }

}
