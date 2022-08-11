import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  constructor(public auth: AuthService, public route: ActivatedRoute) {
    this.route.queryParams.subscribe(res => {
      if (res.invitation) {
        this.auth.loginWithRedirect({
          invitation: res.invitation,
          organization: res.organization
        })
      }

    })

  }
}
