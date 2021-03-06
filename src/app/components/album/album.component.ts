import {Component, OnInit, ViewChild} from '@angular/core';
import {AlbumService} from '../../services/album.service';
import {ActivatedRoute} from '@angular/router';
import {TracksListComponent} from './tracks-list/tracks-list.component';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  album: any = null;
  albumIsSaved: boolean;
  @ViewChild(TracksListComponent)
  private trackListComponent = TracksListComponent;

  constructor(public albumService: AlbumService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params['album_id']) {
        this.albumService.fetchAlbumById(params['album_id'])
          .subscribe(album => {
            this.album = album;
          });

        this.albumService.fetchIfSavedAblum(params['album_id'])
          .subscribe(is_saved => {
            this.albumIsSaved = is_saved[0];
          })
      }
    })
  }

  ngOnInit() {

  }

  navToArtist (artist_id) {
    console.log(artist_id);
  }

  onPlayAlbum () {
    this.albumService.playAlbum(this.album.uri, 0)
      .subscribe();
  }

  onSaveAlbum (album_id) {
    this.albumService.saveAlbum(album_id)
      .subscribe(() => {
        this.albumService.fetchIfSavedAblum(this.album.id)
          .subscribe(is_saved => {
            this.albumIsSaved = is_saved[0];
            this.trackListComponent.updateAllTracksAreFavorited();
          })
      });
  }

  onRemoveAlbum (album_id) {
    this.albumService.removeAlbum(album_id)
      .subscribe(() => {
        this.albumService.fetchIfSavedAblum(this.album.id)
          .subscribe(is_saved => {
            this.albumIsSaved = is_saved[0];
            this.trackListComponent.updateAllTracksAreFavorited();
          })
      })
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
