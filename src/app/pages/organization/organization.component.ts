import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { catchError, of, switchMap } from 'rxjs';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  org = undefined;
  orgs = [];

  constructor(private apiService: ApiService, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.idTokenClaims$.pipe(
      switchMap(idToken => {
        console.log(idToken)
          return this.apiService.getOrganizationsUserIsPartOf(idToken?.sub);
      })
    ).subscribe(orgs => {
      this.orgs = orgs
    })
  }

}
