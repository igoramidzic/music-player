import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AuthService} from './auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class ArtistService {

  constructor(private authService: AuthService, private http: HttpClient) {
  }

  playArtistsPopularTracks (artist_uri) {
    return this.http.put('https://api.spotify.com/v1/me/player/play', {
      'context_uri': artist_uri
    }, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.user.access_token
      })
    })
  }

  fetchArtistById (artist_id) {
    return this.http.get('https://api.spotify.com/v1/artists/' + artist_id, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.user.access_token
      })
    })
  }

  fetchArtistsTopTracks (artist_id) {
    return this.http.get('https://api.spotify.com/v1/artists/' + artist_id + '/top-tracks?country=US', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.user.access_token
      })
    })
  }

  fetchArtistsAlbums (artist_id, limit, offset) {
    if (limit) {}
    return this.http.get('https://api.spotify.com/v1/artists/' + artist_id + '/albums?limit=' + limit + '&offset=' + offset, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.user.access_token
      })
    })
  }

  fetchArtistsRelatedArtists (artist_id) {
    return this.http.get('https://api.spotify.com/v1/artists/' + artist_id + '/related-artists', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.user.access_token
      })
    })
  }

}
