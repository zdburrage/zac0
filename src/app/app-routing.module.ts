import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileFormComponent } from './pages/profile-form/profile-form.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { ErrorComponent } from './pages/error/error.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { AdminGuard } from '../../guards/auth.guard'
import { LoginComponent } from './pages/login/login.component';
import { EmbeddedLoginComponent } from './pages/embedded-login/embedded-login.component';
import { CreateEnterpriseConnectionComponent } from './pages/create-enterprise-connection/create-enterprise-connection.component';
import { ConnectionsPageComponent } from './pages/connections-page/connections-page.component';
import { OrganizationComponent } from './pages/organization/organization.component';
import { ApiKeyPageComponent } from './pages/api-key-page/api-key-page.component';

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
    path: 'embedded-login',
    component: EmbeddedLoginComponent,
  },
  {
    path: 'create-connection',
    component: CreateEnterpriseConnectionComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'connections',
    component: ConnectionsPageComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'organization',
    component: OrganizationComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'api-key',
    component: ApiKeyPageComponent,
    canActivate: [AuthGuard],
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
