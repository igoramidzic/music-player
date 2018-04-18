import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable()
export class TrackService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  playTrack (track_uris) {
    return this.http.put('https://api.spotify.com/v1/me/player/play', {
      'uris': [track_uris]
    }, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.user.access_token
      })
    })
  }

}
