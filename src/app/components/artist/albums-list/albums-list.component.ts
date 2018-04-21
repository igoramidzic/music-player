import {Component, Input, OnInit} from '@angular/core';
import {AlbumService} from '../../../services/album.service';

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.scss']
})
export class AlbumsListComponent implements OnInit {

  @Input('artistAlbums') artistAlbums;
  albumsWithTracks: any;

  constructor(private albumService: AlbumService) { }

  ngOnInit() {
    let album_ids = [];
    this.artistAlbums.forEach((album) => {
      album_ids.push(album.id);
    });

    album_ids = album_ids.slice(0, 20);
    let album_ids_string = album_ids.join(',');
    this.albumService.fetchMultipleAlbumsById(album_ids_string)
      .subscribe((res: {albums}) => {
        this.albumsWithTracks = res.albums
          .filter((thing, index, self) =>
            index === self.findIndex((t) => (
              t.name === thing.name
            ))
          );

        let new_album_ids = [];
        this.albumsWithTracks.forEach((album) => {
          new_album_ids.push(album.id);
        });


        this.albumService.fetchIfSavedAblum(new_album_ids)
          .subscribe((is_saved: any[]) => {
            is_saved.forEach((saved, i) => {
              this.albumsWithTracks[i].is_saved = saved;
            });
          })
      });

  }

  getAlbumLength(album): string {
    if (album) {
      let trackLengthArr = album.tracks.items.map(track => {
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

  onPlayAlbum (album) {
    this.albumService.playAlbum(album.uri, 0)
      .subscribe();
  }

  onSaveAlbum (album, i) {
    this.albumService.saveAlbum(album.id)
      .subscribe(() => {
        this.albumService.fetchIfSavedAblum(album.id)
          .subscribe(is_saved => {
            album = is_saved[0];
            this.albumsWithTracks[i].is_saved = is_saved[0];
            // this.trackListComponent.updateAllTracksAreFavorited();
          })
      });
  }

  onRemoveAlbum (album, i) {
    this.albumService.removeAlbum(album.id)
      .subscribe(() => {
        this.albumService.fetchIfSavedAblum(album.id)
          .subscribe(is_saved => {
            album = is_saved[0];
            this.albumsWithTracks[i].is_saved = is_saved[0];
            // this.trackListComponent.updateAllTracksAreFavorited();
          })
      })
  }



}
