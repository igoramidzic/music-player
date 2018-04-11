import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class TopArtistsAndTracksService {

  user: any;
  $usersTopArtists: BehaviorSubject<any> = new BehaviorSubject(null);
  usersTopArtists: any;
  $usersTopTracks: BehaviorSubject<any> = new BehaviorSubject(null);
  usersTopTracks: any;

  constructor(private http: HttpClient, private authService: AuthService) {

    this.authService.$user.subscribe(user => {
      if (user)
        this.fetchUsersTopArtistsAndTracks();
    })
  }

  fetchUsersTopArtistsAndTracks () {
    this.fetchUsersTopArtists().subscribe(artists => {
      this.$usersTopArtists.next(artists);
      this.usersTopArtists = artists;
    });
    this.fetchUsersTopTracks().subscribe(tracks => {
      this.$usersTopTracks.next(tracks);
      this.usersTopTracks = tracks;
    });
  }

  fetchUsersTopArtists () {
    return this.http.get('https://api.spotify.com/v1/me/top/artists', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.user.access_token
      })
    });
  }

  fetchUsersTopTracks () {
    return this.http.get('https://api.spotify.com/v1/me/top/tracks', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.user.access_token
      })
    });
  }

}
