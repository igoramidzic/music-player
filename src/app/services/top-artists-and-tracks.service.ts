import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class TopArtistsAndTracksService {

  user: any;
  $usersTopArtists: Subject<any> = new Subject();
  usersTopArtists: any;
  $usersTopTracks: Subject<any> = new Subject();
  usersTopTracks: any;

  constructor(private http: HttpClient, private authService: AuthService) {
    if (this.authService.user) {
      this.fetchUsersTopArtistsAndTracks();
    }

    this.authService.getUser().subscribe(user => {
      this.user = user;
      this.fetchUsersTopArtistsAndTracks();
    });
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

  getTopArists(): Observable<any> {
    return this.$usersTopArtists.asObservable();
  }

  getTopTracks(): Observable<any> {
    return this.$usersTopTracks.asObservable();
  }

}