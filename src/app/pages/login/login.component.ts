import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { WebAuth } from 'auth0-js'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  webAuth = new WebAuth({
    domain:       'zacsandbox.us.auth0.com',
    clientID:     'SRxPnDsqhkiccvGny0rzX3RECajkDK6F',
    redirectUri: 'http://localhost:4200'
  });

  constructor(public auth: AuthService, public route: ActivatedRoute) {
    this.auth.loginWithRedirect({connection: 'Oktaverse'});

  }
}
