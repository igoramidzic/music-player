import { Component, OnInit } from '@angular/core';
import {PlaybackDeviceService} from '../../services/playback-device.service';

@Component({
  selector: 'app-main-application',
  templateUrl: './main-application.component.html',
  styleUrls: ['./main-application.component.scss']
})
export class MainApplicationComponent implements OnInit {

  constructor(private playbackDeviceService: PlaybackDeviceService) { }

  ngOnInit() {
  }

}
