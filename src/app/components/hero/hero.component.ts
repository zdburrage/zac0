import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { catchError, of, switchMap } from 'rxjs';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  org = undefined;
  loading = true;

  constructor(private apiService: ApiService, public auth: AuthService) { }

  ngOnInit() {
    this.auth.idTokenClaims$.pipe(
      switchMap(idToken => {
          return this.apiService.getOrganizationById(idToken?.org_id);
      }),
      catchError(err => {
        this.loading = false;
        throw(err);
      }),
      switchMap(org => {
          console.log(org);
          return of(org);
      })
    ).subscribe(org => {
      if (org) {
        this.org = org;
      }
      this.loading = false;
    })
  }

  isb12() {
    return window.location.href.includes('company-a');
  }

}
