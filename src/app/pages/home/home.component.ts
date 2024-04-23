import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, AuthState } from '@auth0/auth0-angular';
import { of, switchMap } from 'rxjs';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(public auth: AuthService, public api: ApiService, public state: AuthState, private route: ActivatedRoute, private router: Router) {

      auth.getAccessTokenSilently().pipe(
        switchMap(res => {
          return this.auth.idTokenClaims$
        })
      ).subscribe(res => {
        if (res["https://auth0.zac.me/guid"]) {
          this.router.navigate(['organization'])
        }
      })
  }


}
