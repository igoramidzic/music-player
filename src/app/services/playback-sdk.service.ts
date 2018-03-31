import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class PlaybackSdkService {

  accessToken: string = 'Bearer BQAx-DWwYyw04LQ5Oj2dN3sBvYF4uN85bjFAa1XyAHyJziXFAd9yE9FDbTAAPkrQ9HsA_3fnDc4kGrycS_Dce_sexglbnOTjyApU2fQhf3nKEaqzqvW-COMvDOFtA1typuU1pzvKVSeqGppkZqTQYl3T9Iv34donJilmJP1ip-5WXY4MIPvvI41s4gqVndXMVkHaT4mRXgh6wSGQ-WoLiZdZC-Z79zsnBk9Aw7u9lPn6GcQhKNFmeRQia7cCDCesQWpGRijVHbye';

  constructor(private http: HttpClient) {

  }

  pausePlayback () {
    return this.http.put('https://api.spotify.com/v1/me/player/pause', {}, {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      })
    })
  }

  playPlayback () {
    return this.http.put('https://api.spotify.com/v1/me/player/play', {}, {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      })
    })
  }

}
