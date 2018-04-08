import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {

  $user: Subject<any> = new Subject();
  user: any;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (params['access_token'] && params['refresh_token']) {
        let userCredentials = {
          access_token: params['access_token'],
          refresh_token: params['refresh_token']
        };
        this.getUserInfo(userCredentials);
      }
    });

    this.$user.subscribe(user => this.user = user);
  }

  getUserInfo (userCredentials) {
    this.http.get('https://api.spotify.com/v1/me', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + userCredentials.access_token
      })
    }).subscribe(user => {
      this.$user.next(user);
      this.user.access_token = userCredentials.access_token;
      this.user.refresh_token = userCredentials.refresh_token;
      // // Navigates to `/` to remove query parameters
      // this.router.navigate(['']);
    });
  }

  // Not yet implemented
  getNewAccessToken () {
    return this.http.get('/refresh_token?refresh_token=' + this.user.refresh_token);
  }

  logout () {

  }

  getUser(): Observable<any> {
    return this.$user.asObservable();
  }

}

interface Res {
  access_token: string;
}
