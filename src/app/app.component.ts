import { Component } from '@angular/core';
import {AuthService} from './services/auth.service';
import {PlaybackSdkService} from './services/playback-sdk.service';
import {PlaybackDeviceService} from './services/playback-device.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor (private playbackSDK: PlaybackSdkService, private authService: AuthService,
               public playbackDeviceService: PlaybackDeviceService,
               private notificationsService: NotificationsService) {
  }
}
