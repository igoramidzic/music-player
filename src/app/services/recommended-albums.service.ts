import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {TopArtistsAndTracksService} from './top-artists-and-tracks.service';

@Injectable()
export class RecommendedAlbumsService {

  $recommendedAlbums: Subject<any> = new Subject();

  constructor(private http: HttpClient, private authService: AuthService,
              private topAristsAndTracksService: TopArtistsAndTracksService) {
    this.topAristsAndTracksService.getTopTracks().subscribe(tracks => {
      this.fetchRecommendedAlbums(tracks.items).subscribe((res: {tracks}) => {
        console.log(this.filterAndMapAlbumsUsingTracks(res.tracks));
        this.$recommendedAlbums.next(this.filterAndMapAlbumsUsingTracks(res.tracks));
      })
    })
  }

  fetchRecommendedAlbums (tracks) {
    return this.http.get('https://api.spotify.com/v1/recommendations?limit=100&seed_tracks=' + this.formatSeedTracksString(tracks, 5), {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.user.access_token
      })
    })
  }

  formatSeedTracksString (tracks, numberOfElements) {
    return tracks.map(track => {
      return track.id;
    }).slice(0, numberOfElements).join(',');
  }

  filterAndMapAlbumsUsingTracks (tracks) {
    return this.randomizeAlbums(tracks, 6).filter(track => {
      if (track.album.album_type == 'ALBUM') {
        return track;
      }
      return;
    }).map(track => {
      return {
        imgURL: track.album.images[0].url,
        albumName: track.album.name,
        artist: track.artists[0].name,
        id: track.album.id,
      }
    });
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

  getRecommendedAlbums(): Observable<any> {
    return this.$recommendedAlbums.asObservable();
  }

}