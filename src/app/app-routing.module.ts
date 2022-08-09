import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileFormComponent } from './pages/profile-form/profile-form.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { ErrorComponent } from './pages/error/error.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile-form',
    component: ProfileFormComponent,

  },
  {
    path: 'schedule',
    component: ScheduleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
