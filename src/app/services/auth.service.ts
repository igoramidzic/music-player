import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import 'query-string';


@Injectable()
export class AuthService {

  user: any = null;

  constructor(private http: HttpClient,
              private cookieService: CookieService,
              private route: ActivatedRoute) {

    console.log(this.cookieService.get('access_token'))
    if (this.cookieService.get('access_token')) {
      this.getUserData(this.cookieService.get('access_token'));
    }

    this.route.fragment.subscribe(fragment => {
      if (fragment && fragment.substr(0, 13) == 'access_token=') {
        let token = this.parseFragmentForToken(fragment);
        this.saveUserAccessToken(token);
        this.getUserData(token);
      }
    })
  }

  parseFragmentForToken (fragment) {
    return 'Bearer ' + fragment.substr(13, fragment.indexOf('&') - 13);
  }

  saveUserAccessToken (token) {
    this.cookieService.put('access_token', token);
  }

  retrieveUserAccessToken () {
    return this.cookieService.get('access_token');
  }

  destroyUserAccessToken () {
    this.cookieService.remove('access_token');
  }

  login () {
    let token = this.retrieveUserAccessToken();
    this.getUserData(token);
  }

  logout () {
    this.destroyUserAccessToken();
    this.user = null;
  }

  getUserData (token) {
    this.http.get('https://api.spotify.com/v1/me', {
      headers: new HttpHeaders({
        'Authorization': token
      })
    }).subscribe(user => {
      this.user = user;
    })
  }

}
