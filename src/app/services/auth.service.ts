import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class AuthService {

  user: any = null;

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
    })
  }

  getUserInfo (userCredentials) {
    this.http.get('https://api.spotify.com/v1/me', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + userCredentials.access_token
      })
    }).subscribe(user => {
      this.user = user;
      this.user.access_token = userCredentials.access_token;
      this.user.refresh_token = userCredentials.refresh_token;
      this.router.navigate(['']);
    })
  }


  // Not yet implemented
  getNewAccessToken () {
    this.http.get('/refresh_token?refresh_token=' + this.user.refresh_token)
      .subscribe((res: Res) => {
        this.user.access_token = res.access_token;
      })
  }

  logout () {

  }

}

interface Res {
  access_token: string;
}
