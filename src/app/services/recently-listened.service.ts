import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class RecentlyListenedService {

  $recentlyPlayedList: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService, private http: HttpClient) {
    this.authService.$user.subscribe(user => {
      if (user) {
        this.fetchRecentlyPlayedList().subscribe((res: {items}) => {
          this.$recentlyPlayedList.next(this.mapAndFilterRecentlyPlayedList(res.items, 6));
        })
      }
    });
  }

  fetchRecentlyPlayedList () {
    return this.http.get('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.user.access_token
      })
    })
  }

  mapAndFilterRecentlyPlayedList (list, count) {
    return list.filter((thing, index, self) =>
        index === self.findIndex((t) => (
          t.track.id === thing.track.id
        ))
      )
      .slice(0, count);
  }

}

