import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable()
export class PlaybackDeviceService {

  availableDevices: any[];
  thisDevice: any;
  activeDevice: any;

  constructor(private http: HttpClient, private authService: AuthService) {
    if (this.authService.user) {
      this.updateAvailableDevices();
    }

    this.authService.getUser().subscribe(user => {
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
      console.log(this.availableDevices);
    });
  }

  getThisDeviceInfo () {
    this.thisDevice = this.availableDevices.filter((x) => {
      if (x.name === 'Music Player Web App') {
        return x;
      }
    })[0];
  }

  getActiveDeviceInfo () {
    this.activeDevice = this.availableDevices.filter((x) => {
      if (x.is_active) {
        return x;
      }
    })[0];
  }

  getShowNotification(): boolean {
    return this.activeDevice && this.activeDevice.name != 'Music Player Web App';
  }

}
