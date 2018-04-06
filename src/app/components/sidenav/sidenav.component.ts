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

  onLogout () {
    this.authService.logout();
  }

}
