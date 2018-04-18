import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ArtistService} from '../../services/artist.service';
import {ActivatedRoute} from '@angular/router';
import {FollowService} from '../../services/follow.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  artist: any;
  artistAlbums: any;
  popularTracks: any;
  relatedArtists: any;

  constructor(private artistService: ArtistService, private route: ActivatedRoute,
              private followService: FollowService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['artist_id']) {
        this.artistService.fetchArtistById(params['artist_id'])
          .subscribe((artist: {id}) => {
            this.artist = artist;
            this.updateIsFollowing(artist.id);
          });

        this.artistService.fetchArtistsAlbums(params['artist_id'], 20, 0)
          .subscribe((albums: {items}) => {
            this.artistAlbums = albums.items;
            console.log(this.artistAlbums[0])
          });

        this.artistService.fetchArtistsTopTracks(params['artist_id'])
          .subscribe((popularTracks: {tracks}) => {
            this.popularTracks = popularTracks.tracks;
          });

        this.artistService.fetchArtistsRelatedArtists(params['artist_id'])
          .subscribe((relatedArtists: {artists}) => {
            this.relatedArtists = relatedArtists.artists.splice(0, 7);
          });

      }
    })
  }

  updateIsFollowing (artist_id) {
    this.followService.fetchIfUserFollowsArtist(artist_id)
      .subscribe(res => {
        this.artist.is_following = res[0];
      })
  }

  onPlayArtistsPopularTracks (artist_uri) {
    this.artistService.playArtistsPopularTracks(artist_uri)
      .subscribe();
  }

  onFollowArtist (artist_id) {
    this.followService.follow(artist_id, 'artist')
      .subscribe(() => {
        this.updateIsFollowing(artist_id);
      })
  }

  onUnfollowArtist (artist_id) {
    this.followService.unfollow(artist_id)
      .subscribe(() => {
        this.updateIsFollowing(artist_id);
      })
  }

}
