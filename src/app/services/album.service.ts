import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AlbumService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  fetchAlbumById (album_id) {
    return this.http.get('https://api.spotify.com/v1/albums/' + album_id, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.user.access_token
      })
    })
  }

  fetchMultipleAlbumsById (album_ids) {
    return this.http.get('https://api.spotify.com/v1/albums/?ids=' + album_ids, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.user.access_token
      })
    })
  }

  playAlbum (album_uri, track_number) {
    return this.http.put('https://api.spotify.com/v1/me/player/play', {
      'context_uri': album_uri,
      "offset": {"position": track_number}
    }, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.user.access_token
      })
    })
  }

  saveAlbum (album_id) {
    return this.http.put('https://api.spotify.com/v1/me/albums?ids=' + album_id, {}, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.user.access_token
      })
    })
  }

  removeAlbum (album_id) {
    return this.http.delete('https://api.spotify.com/v1/me/albums?ids=' + album_id, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.user.access_token
      })
    })
  }

  fetchIfSavedAblum (album_ids) {
    return this.http.get('https://api.spotify.com/v1/me/albums/contains?ids=' + album_ids, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.user.access_token
      })
    })
  }

}
