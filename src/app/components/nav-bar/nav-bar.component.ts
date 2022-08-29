import { Component, Inject, OnInit } from '@angular/core';
import { faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isCollapsed = true;
  faUser = faUser;
  faPowerOff = faPowerOff;
  orgs = [];

  constructor(
    public auth: AuthService,
    private apiService: ApiService,
    public router: Router,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngOnInit() {
    this.apiService.getOrganizations().subscribe(res => {
      this.orgs = res;
    })
  }

  loginWithRedirect() {
    this.auth.loginWithRedirect()
  }

  loginWithOrg(orgId: string) {
    this.auth.loginWithRedirect({organization: orgId});
  }

  loginWithBigCommerce() {
    this.auth.loginWithRedirect({
      connection: 'BigCommerce'
    });
  }

  loginWithAD() {
    this.auth.loginWithRedirect({
      connection: 'auth0-test-ad'
    });
  }

  goToEmbeddedLogin() {
    this.router.navigate(['/embedded-login']);
  }

  logout() {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }
}
