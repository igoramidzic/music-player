import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import 'query-string';
import * as querystring from 'querystring';
declare const Buffer;

@Injectable()
export class AuthService {

  user: any = null;
  client_id = 'a588c1b7c268458f8894cc0c64c0539a'; // Your client id
  client_secret = 'ac7422aa85dc41a09b4fab5418ee079c'; // Your secret
  redirect_uri = window.location.href; // Your redirect uri
  scope = 'user-read-private user-read-birthdate user-read-email playlist-read-private user-library-modify playlist-read-collaborative playlist-modify-private user-follow-modify user-read-currently-playing user-read-recently-played user-library-read user-top-read playlist-modify-public user-follow-read user-read-playback-state user-modify-playback-state';

  code = null;

  constructor(private http: HttpClient,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router) {

    // Run getAccessToken() if 'code' queryParam is not null.
    this.route.queryParams.subscribe(params => {
      if (params['code']) {
        this.code = params['code'];
        this.getAccessToken();
      }
    })
  }

  login () {
    let queryString = querystring.stringify({
      response_type: 'code',
      client_id: this.client_id,
      scope: this.scope,
      redirect_uri: this.redirect_uri,
    });
    window.location.href = 'https://accounts.spotify.com/authorize?' + queryString;
  }

  getAccessToken () {
    this.http.post('https://accounts.spotify.com/api/token', {
      code: this.code,
      redirect_uri: this.redirect_uri,
      grant_type: 'authorization_code'
    }, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': 'https://accounts.spotify.com',
        'Authorization': 'Basic ' + (new Buffer(this.client_id
                                      + ':'
                                      + this.client_secret).toString('base64'))
      })
    }).subscribe(response => {
      console.log(response);
    })
  }

  logout () {

  }

}
