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
    if (!window.location.href.includes('company-a')) {
      this.apiService.getOrganizations().subscribe(res => {
        this.orgs = res;
      })
    }
  }

  loginWithRedirect() {
    this.auth.loginWithRedirect({
      authorizationParams: {
        redirect_uri: this.doc.location.origin
      }
    });
  }

  loginWithOrg(orgId: string) {
    this.auth.loginWithRedirect({
      authorizationParams: {
        organization: orgId,
        redirect_uri: this.doc.location.origin
      }
    })
  }


  goToLink(route: string) {
    this.router.navigate([`${route}`]);
  }

  logout() {
    this.auth.logout({ logoutParams:{
      returnTo: this.doc.location.origin
    } });
  }

  // public getYear() {
  //   return new Date().getFullYear();
  // }
}
