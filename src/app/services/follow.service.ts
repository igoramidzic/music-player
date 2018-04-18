import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class FollowService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  follow (ids, type) {
    return this.http.put('https://api.spotify.com/v1/me/following?ids=' + ids + '&type=' + type, {},{
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.user.access_token
      })
    });
  }

  unfollow (id) {
    return this.http.delete('https://api.spotify.com/v1/me/following?type=artist&ids=' + id, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.user.access_token
      })
    });
  }

  fetchIfUserFollowsArtist (artist_ids) {
    return this.http.get('https://api.spotify.com/v1/me/following/contains?type=artist&ids=' + artist_ids, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.user.access_token
      })
    });
  }

  fetchUserFollowing () {
    return this.http.get('https://api.spotify.com/v1/me/following?type=artist', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.user.access_token
      })
    });
  }

}
