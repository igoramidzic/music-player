import { Component, OnInit } from '@angular/core';
import {PlaybackDeviceService} from '../../../services/playback-device.service';

@Component({
  selector: 'app-device-notification',
  templateUrl: './device-notification.component.html',
  styleUrls: ['./device-notification.component.scss']
})
export class DeviceNotificationComponent implements OnInit {

  showNotification: boolean;

  constructor(public playbackDeviceService: PlaybackDeviceService) { }

  ngOnInit() {
  }

}
