import { Component, OnInit } from '@angular/core';
import {Ng2DeviceService} from 'ng2-device-detector';
import {TopArtistsAndTracksService} from '../../../services/top-artists-and-tracks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  recentlyPlayed: { name: String, artist: String, url: String }[];
  os: string;

  constructor(private deviceService: Ng2DeviceService, private topArtistsAndTracksService: TopArtistsAndTracksService) { }

  ngOnInit() {
    this.os = this.deviceService.os;
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
