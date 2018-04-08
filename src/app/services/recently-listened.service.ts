import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RecentlyListenedItem} from '../models/recently-listened-item';

@Injectable()
export class RecentlyListenedService {

  recentlyPlayedList: RecentlyListenedItem[] = null;

  constructor(private authService: AuthService, private http: HttpClient) { }

  getRecentlyPlayedList () {
    return this.http.get('https://api.spotify.com/v1/me/player/recently-played?limit=6', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.user.access_token
      })
    })
  }

}

