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
    this.route.queryParams.subscribe(res => {
      if (res.invitation) {
        this.auth.loginWithRedirect({
          invitation: res.invitation,
          organization: res.organization,
          redirect_uri: 'http://localhost:3000'
        })
      }  
    })

    this.route.fragment.subscribe(res => {
      this.webAuth.parseHash({ hash: window.location.hash }, (err, authResult) => {
        if (err) {
          return console.log(err);
        }
      
        this.webAuth.client.userInfo(authResult.accessToken, function(err, user) {
          console.log(user);
          window.location.href = 'http://localhost:4200';
        });
      });
    })

  }
}
