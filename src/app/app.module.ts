import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {MatSliderModule} from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2DeviceDetectorModule } from 'ng2-device-detector';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HttpClientModule } from '@angular/common/http';
import { NgPipesModule } from 'ngx-pipes';
import { SimpleTimer } from 'ng2-simple-timer';
import {environment} from '../environments/environment';
import { SimpleNotificationsModule } from 'angular2-notifications';

import {AuthService} from './services/auth.service';
import {CookieService} from 'angular2-cookie/core';
import {PlaybackSdkService} from './services/playback-sdk.service';

import { AppComponent } from './app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SettingsComponent } from './components/pages/settings/settings.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { LoginComponent } from './components/pages/login/login.component';
import { PlayerComponent } from './components/player/player.component';
import { TimePipe } from './pipes/time.pipe';
import { BrowseComponent } from './components/pages/browse/browse.component';
import { RadioComponent } from './components/pages/radio/radio.component';
import { PlaylistsComponent } from './components/pages/playlists/playlists.component';
import { FeaturedComponent } from './components/pages/featured/featured.component';
import { HeaderSongComponent } from './components/pages/home/header-song/header-song.component';
import { FeaturedForYouComponent } from './components/pages/home/featured-for-you/featured-for-you.component';
import { RecommendedAlbumsComponent } from './components/pages/home/recommended-albums/recommended-albums.component';
import { RecentlyListenedComponent } from './components/pages/home/recently-listened/recently-listened.component';
import { BetaTagComponent } from './components/beta-tag/beta-tag.component';
import { MainApplicationComponent } from './components/main-application/main-application.component';
import { SafePipe } from './pipes/safe.pipe';
import {RecentlyListenedService} from './services/recently-listened.service';
import {TopArtistsAndTracksService} from './services/top-artists-and-tracks.service';
import {PlaybackDeviceService} from './services/playback-device.service';
import { DeviceNotificationComponent } from './components/player/device-notification/device-notification.component';
import {RecommendedAlbumsService} from './services/recommended-albums.service';
import {FavoritesService} from './services/favorites.service';
import { AlbumComponent } from './components/album/album.component';
import {AlbumService} from './services/album.service';
import { TracksListComponent } from './components/album/tracks-list/tracks-list.component';
import {PlayerApiService} from './services/player-api.service';
import { ArtistComponent } from './components/artist/artist.component';
import {ArtistService} from './services/artist.service';
import { RelatedArtistsComponent } from './components/artist/related-artists/related-artists.component';
import {TrackService} from './services/track.service';
import { PopularTracksComponent } from './components/artist/popular-tracks/popular-tracks.component';
import {FollowService} from './services/follow.service';
import { AlbumsListComponent } from './components/artist/albums-list/albums-list.component';
import { FavoritesComponent } from './components/pages/favorites/favorites.component';
import { SongListComponent } from './components/pages/favorites/song-list/song-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HomeComponent,
    SettingsComponent,
    SignupComponent,
    LoginComponent,
    PlayerComponent,
    TimePipe,
    BrowseComponent,
    RadioComponent,
    PlaylistsComponent,
    FeaturedComponent,
    HeaderSongComponent,
    FeaturedForYouComponent,
    RecommendedAlbumsComponent,
    RecentlyListenedComponent,
    BetaTagComponent,
    MainApplicationComponent,
    SafePipe,
    DeviceNotificationComponent,
    AlbumComponent,
    TracksListComponent,
    ArtistComponent,
    RelatedArtistsComponent,
    PopularTracksComponent,
    AlbumsListComponent,
    FavoritesComponent,
    SongListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSliderModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2DeviceDetectorModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule,
    NgPipesModule,
    SimpleNotificationsModule.forRoot(<any>{
      timeOut: 2000,
      showProgressBar: false,
      pauseOnHover: true,
      clickToClose: false,
      rtl: true,
      clickIconToClose: true,
      position: ['top', 'right']
    })
  ],
  providers: [AuthService, CookieService, PlaybackSdkService, RecentlyListenedService, SimpleTimer, TopArtistsAndTracksService, PlaybackDeviceService, RecommendedAlbumsService, FavoritesService,
  AlbumService, PlayerApiService, ArtistService, TrackService, FollowService],
  bootstrap: [AppComponent]
})
export class AppModule { }
