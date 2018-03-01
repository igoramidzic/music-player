import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {HomeComponent} from './components/pages/home/home.component';
import {SettingsComponent} from './components/pages/settings/settings.component';
import {NotificationsComponent} from './components/pages/notifications/notifications.component';
import {SignupComponent} from './components/pages/signup/signup.component';
import {LoginComponent} from './components/pages/login/login.component';

// Routes
const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'settings', component: SettingsComponent},
  { path: 'notifications', component: NotificationsComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}
