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
  members = [];

  constructor(private apiService: ApiService, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.idTokenClaims$.pipe(
      switchMap(idToken => {
          return this.apiService.getOrganizationById(idToken?.org_id);
      }),
      catchError(err => {
        throw(err);
      }),
      switchMap(org => {
          this.org = org;
          return this.apiService.getOrgMembers(org.id);
      })
    ).subscribe(members => {
      this.members = members
    })
  }

}
