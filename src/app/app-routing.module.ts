import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {HomeComponent} from './components/pages/home/home.component';
import {SettingsComponent} from './components/pages/settings/settings.component';
import {SignupComponent} from './components/pages/signup/signup.component';
import {LoginComponent} from './components/pages/login/login.component';
import {BrowseComponent} from './components/pages/browse/browse.component';
import {RadioComponent} from './components/pages/radio/radio.component';
import {PlaylistsComponent} from './components/pages/playlists/playlists.component';
import {FeaturedComponent} from './components/pages/featured/featured.component';
import {AlbumComponent} from './components/album/album.component';
import {ArtistComponent} from './components/artist/artist.component';
import {FavoritesComponent} from './components/pages/favorites/favorites.component';

// Routes
const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'settings', component: SettingsComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'browse', component: BrowseComponent},
  { path: 'radio', component: RadioComponent},
  { path: 'playlists', component: PlaylistsComponent},
  { path: 'featured', component: FeaturedComponent},
  { path: 'favorites', component: FavoritesComponent},
  { path: 'album', component: AlbumComponent},
  { path: 'artist', component: ArtistComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}
