import { Component, OnInit } from '@angular/core';
import {Ng2DeviceService} from 'ng2-device-detector';
import {TopArtistsAndTracksService} from '../../../services/top-artists-and-tracks.service';
import {PlaybackDeviceService} from '../../../services/playback-device.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  os: string;

  constructor(private deviceService: Ng2DeviceService, public playbackDeviceService: PlaybackDeviceService) { }

  ngOnInit() {
    this.os = this.deviceService.os;
  }

}
