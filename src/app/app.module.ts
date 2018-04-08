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
import {environment} from '../environments/environment';

import {AudioService} from './services/audio.service';
import {AuthService} from './services/auth.service';
import {CookieService} from 'angular2-cookie/core';
import {PlaybackSdkService} from './services/playback-sdk.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SettingsComponent } from './components/pages/settings/settings.component';
import { NotificationsComponent } from './components/pages/notifications/notifications.component';
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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidenavComponent,
    HomeComponent,
    SettingsComponent,
    NotificationsComponent,
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
    NgPipesModule
  ],
  providers: [AudioService, AuthService, CookieService, PlaybackSdkService, RecentlyListenedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
