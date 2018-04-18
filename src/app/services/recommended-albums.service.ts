import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {TopArtistsAndTracksService} from './top-artists-and-tracks.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class RecommendedAlbumsService {

  $recommendedAlbums: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private authService: AuthService,
              private topAristsAndTracksService: TopArtistsAndTracksService) {
    this.authService.$user.subscribe(user => {
      if (user) {
        this.topAristsAndTracksService.$usersTopTracks.subscribe(tracks => {
          if (tracks && tracks.items.length > 0) {
            this.fetchRecommendedAlbums(tracks.items).subscribe((res: {tracks}) => {
              this.$recommendedAlbums.next(this.filterAndMapAlbumsUsingTracks(res.tracks));
            })
          }
        });
      }
    });
  }

  fetchRecommendedAlbums (tracks) {
    return this.http.get('https://api.spotify.com/v1/recommendations?limit=100&seed_tracks=' + this.formatSeedTracksString(tracks, 5), {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.user.access_token
      })
    });
  }

  formatSeedTracksString (tracks, numberOfElements) {
    return tracks.map(track => {
      return track.id;
    }).slice(0, numberOfElements).join(',');
  }

  filterAndMapAlbumsUsingTracks (tracks) {
    return tracks.filter(track => {
      if (track.album.album_type == 'ALBUM') {
        return track;
      }
      return
    }).splice(0, 6)
  }

  randomizeAlbums (albums, n) {
    let filteredAlbums = new Array(n),
      len = albums.length,
      taken = new Array(len);

    while (n--) {
      let x = Math.floor(Math.random() * len);
      filteredAlbums[n] = albums[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }

    return filteredAlbums;
  }

}
