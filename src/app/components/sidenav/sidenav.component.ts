import { Component, OnInit } from '@angular/core';
import {Ng2DeviceService} from 'ng2-device-detector';
import { AuthService } from '../../services/auth.service';
import {PlaybackDeviceService} from '../../services/playback-device.service';
import {PlaybackSdkService} from '../../services/playback-sdk.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  playerState: any;
  os: any;
  queueTracks: Observable<Array<any>>;

  constructor(private deviceService: Ng2DeviceService,
              private authService: AuthService,
              public playbackSDKService: PlaybackSdkService,
              private playbackDeviceService: PlaybackDeviceService) { }

  ngOnInit() {
    this.os = this.deviceService.os;

    this.playbackSDKService.$playerState.subscribe(state => {
      this.playerState = state;
    });
  }

  onChangeVolume (volume) {
    volume = Math.floor(volume * 100);
    this.playbackDeviceService.changeVolume(volume)
      .subscribe();
  }

}
