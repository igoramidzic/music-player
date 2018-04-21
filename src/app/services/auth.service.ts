import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {CookieService} from 'angular2-cookie/core';
import {NotificationsService} from 'angular2-notifications';

@Injectable()
export class AuthService {

  $user: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  user: any;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              private cookieService: CookieService,
              private notificationsService: NotificationsService) {

    this.route.queryParams.subscribe(params => {
      // If access_token & refresh_token are in URL
      if (params['access_token'] && params['refresh_token'] && !this.user) {
        this.storeRefreshTokenInCache(params['refresh_token']);
        this.getUserInfo(params['access_token']);
        // If access_token is in cookies
      } else if (this.cookieService.get('refresh_token') && !this.user) {
        this.getNewAccessToken(this.cookieService.get('refresh_token'))
          .subscribe((res: {access_token}) => {
            this.getUserInfo(res.access_token);
          });
      }
    });

    this.$user.subscribe(user => this.user = user);
  }

  getUserInfo (access_token) {
    this.http.get('https://api.spotify.com/v1/me', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + access_token
      })
    }).subscribe(user => {
      let user_data: any = user;
      user_data.access_token = access_token;
      this.$user.next(user_data);
      this.refreshAccessTokenAfterOneHour();

      // Navigates to `/` to remove query parameters
      this.router.navigate(['']);
    });
  }

  storeAccessTokenInCache (access_token) {
    let accessTokenExpirationDate = new Date();
    accessTokenExpirationDate.setMinutes(accessTokenExpirationDate.getMinutes() + 60);

    this.cookieService.put('access_token', access_token,
      {expires: accessTokenExpirationDate});
  }

  storeRefreshTokenInCache (refresh_token) {
    let refreshTokenExpirationDate = new Date();
    refreshTokenExpirationDate.setHours(refreshTokenExpirationDate.getHours() + 24 * 7);

    this.cookieService.put('refresh_token', refresh_token,
      {expires: refreshTokenExpirationDate});
  }

  getNewAccessToken (refresh_token) {
    return this.http.get('/refresh_token?refresh_token=' + refresh_token);
  }

  refreshAccessTokenAfterOneHour () {
    setTimeout(() => {
      if (this.cookieService.get('refresh_token')) {
        this.getNewAccessToken(this.cookieService.get('refresh_token'))
          .subscribe((res: {access_token}) => {
            this.user.access_token = res.access_token;
            // Recursive call to constantly fetch new access_token
            this.refreshAccessTokenAfterOneHour();
          })
      } else {
        // Remove user
        this.$user.next(null);
        this.notificationsService.alert('You\'ve been logged out');
        window.player.disconnect();
      }
    }, 1000 * 60 * 60) // 60 minutes
  }

  logout () {

  }
}
