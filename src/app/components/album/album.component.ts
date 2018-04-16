import { Component, OnInit } from '@angular/core';
import {RecommendedAlbumsService} from '../../services/recommended-albums.service';
import {AlbumService} from '../../services/album.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  album = null;

  constructor(public albumService: AlbumService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params['album_id']) {
        this.albumService.fetchAlbumById(params['album_id'])
          .subscribe(album => {
            this.album = album;
          })
      }
    })
  }

  ngOnInit() {

  }

  navToArtist (artist_id) {
    console.log(artist_id);
  }

  onSaveAlbum (album_id) {
    console.log("Save this album: " + album_id);
  }

  onPlayAlbum () {
    this.albumService.playAlbum(this.album.uri, 0)
      .subscribe();
  }

  getAlbumLength(): string {
    if (this.album) {
      let trackLengthArr = this.album.tracks.items.map(track => {
        return track.duration_ms;
      });

      let duration = 0;

      trackLengthArr.forEach(duration_ms => {
        duration += duration_ms;
      });

      let minutes = Math.floor(duration / (1000 * 60));
      let hours = Math.floor(minutes / 60);
      minutes = Math.floor(minutes - hours * 60);

      if (hours && minutes) {
        return hours + ' hr ' + minutes + ' min';
      } else if (!hours && minutes) {
        return minutes + ' min';
      }
    }
    return "0";
  }

}
