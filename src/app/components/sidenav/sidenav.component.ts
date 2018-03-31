import { Component, OnInit } from '@angular/core';
import {Ng2DeviceService} from 'ng2-device-detector';
import { AuthService } from '../../services/auth.service';
import { AudioService } from '../../services/audio.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  os: string;
  queue: { name: String, artist: String}[];

  client_id = environment.spotify_client_id;
  scopes = 'user-read-private user-read-birthdate user-read-email playlist-read-private user-library-modify playlist-read-collaborative playlist-modify-private user-follow-modify user-read-currently-playing user-read-recently-played user-library-read user-top-read playlist-modify-public user-follow-read user-read-playback-state user-modify-playback-state';
  login_link = 'https://accounts.spotify.com/authorize' +
  '?response_type=token' +
  '&client_id=' + this.client_id +
(this.scopes ? '&scope=' + encodeURIComponent(this.scopes) : '') +
  '&redirect_uri=' + 'http://localhost:4200';

  constructor(private deviceService: Ng2DeviceService,
              private authService: AuthService,
              private audioService: AudioService) { }

  ngOnInit() {
    this.os = this.deviceService.os;

    this.queue = [
      { name: 'Golden Sands', artist: 'Imagine Dragons' },
      { name: 'Neon Sound', artist: 'AVICII' },
      { name: 'Drop The Game', artist: 'Flume' },
      { name: 'On Hold', artist: 'the XX' },
    ]
  }

  onSignup () {

  }

  onLogin () {
    this.authService.login();
  }

  onLogout () {
    this.authService.logout();
  }

}
