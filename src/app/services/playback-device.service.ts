import {Injectable, NgZone} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable()
export class PlaybackDeviceService {

  availableDevices: any[];
  thisDevice: any;
  activeDevice: any;

  constructor(private http: HttpClient, private authService: AuthService, private zone: NgZone) {
    this.authService.$user.subscribe(user => {
      if (user && user.product == 'premium')
        this.updateAvailableDevices();
    });
  }

  getUsersAvailableDevices () {
    return this.http.get('https://api.spotify.com/v1/me/player/devices', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.user.access_token
      })
    })
  }

  updateAvailableDevices () {
    this.getUsersAvailableDevices().subscribe((devices: {devices}) => {
      this.availableDevices = devices.devices;
      this.getActiveDeviceInfo();
      this.getThisDeviceInfo();

      // Make this device the active device if no active device
      if (!this.activeDevice && this.thisDevice && this.activeDevice != this.thisDevice) {
        this.setPlaybackDevice(this.thisDevice.id).subscribe();
      }
    });
  }

  getThisDeviceInfo () {
    this.zone.run(() => {
      this.thisDevice = this.availableDevices.filter((x) => {
        if (x.name === 'Music Player Web App') {
          return x;
        }
      })[0];
    });
  }

  getActiveDeviceInfo () {
    this.activeDevice = this.availableDevices.filter((x) => {
      if (x.is_active) {
        return x;
      }
    })[0];
  }

  setPlaybackDevice (device_id) {
    return this.http.put('https://api.spotify.com/v1/me/player', {
      "device_ids": [device_id]
    }, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.user.access_token
      })
    })
  }

  changeVolume (volume) {
    return this.http.put('https://api.spotify.com/v1/me/player/volume?volume_percent=' + volume, {}, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.user.access_token
      })
    })
  }

  getShowNotification(): boolean {
    return this.activeDevice && this.activeDevice.name != 'Music Player Web App';
  }

  getShowDeviceList(): boolean {
    return !!this.thisDevice;
  }

}
