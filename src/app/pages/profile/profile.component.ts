import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import jwtDecode, * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements AfterViewInit {
  profileJson: string = null;
  tokenJson: string = null;

  constructor(public auth: AuthService) {
  }

  ngAfterViewInit() {
    this.auth.user$.subscribe(
      (profile) => {
        this.profileJson = JSON.stringify(profile, null, 2);
      }
    );

    this.auth.getAccessTokenSilently().subscribe(
      (token) => {
        console.log(token)
        token = jwt_decode.default(token);
        console.log(token)
        this.tokenJson = JSON.stringify((token), null, 2);
      }
    )
  }
}
