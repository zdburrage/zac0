import { Component, OnInit } from '@angular/core';
import { AuthService, AuthState } from '@auth0/auth0-angular';
import { of, switchMap } from 'rxjs';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(public auth: AuthService, public api: ApiService, public state: AuthState) {
      auth.getAccessTokenSilently().subscribe(res => {
        console.log(res);
      })
  }


}
