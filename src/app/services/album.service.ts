import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AlbumService {

  $album: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.$user.subscribe(user => {
      if (user) {
        this.fetchAlbumById("4F87p1aiFwHeU4uu65MaPV")
          .subscribe(album => {
            this.$album.next(album);
          });
      }
    })
  }

  fetchAlbumById (album_id) {
    return this.http.get('https://api.spotify.com/v1/albums/' + album_id, {
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

}
