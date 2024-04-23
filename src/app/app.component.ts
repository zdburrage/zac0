import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Auth0 Angular SDK Sample';
  display = undefined;

  constructor(public router: Router, public auth0: AuthService) {
    this.router.events.subscribe(res => {
      if (this.router.url === '/embedded-login') {
        this.display = false;
      } else {
        this.display = true;
      }
    })

  }

}
