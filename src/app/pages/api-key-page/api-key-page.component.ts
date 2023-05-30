import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { switchMap } from 'rxjs';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-api-key-page',
  templateUrl: './api-key-page.component.html',
  styleUrls: ['./api-key-page.component.css'],
})
export class ApiKeyPageComponent implements OnInit {

  connections: [];
  orgId: string;
  user: User = undefined;
  clientId: string = null;
  clientSecret: string = null;
  acr: string = null;


  constructor(public auth: AuthService,
              public route: ActivatedRoute,
              private formBuilder: FormBuilder,
               private apiService: ApiService,
               private router: Router) {

      this.auth.user$.subscribe(res => {
        this.orgId = res.org_id;
        this.user = res;
      })

      this.auth.idTokenClaims$.subscribe(res => {
        this.acr = res.acr;
      })
    
  }

  ngOnInit() {

    this.apiService.getConnections(this.orgId).subscribe(res => {
      this.connections = res;
    })
  }

  createm2m() {
    if (!this.acr) {
      this.auth.loginWithRedirect({
        redirect_uri: 'https://zacsandbox.com/api-key',
        acr_values: 'http://schemas.openid.net/pape/policies/2007/06/multi-factor'
      })
    } else {
      this.apiService.postCreateM2m(this.user.sub).subscribe(res => {
        this.clientId = res.client_id;
        this.clientSecret = res.client_secret;
      })
    }
  }

  deleteConnection(id: number) {
    this.apiService.deleteConnection(id).pipe(
        switchMap(res => {
            return this.apiService.getConnections(this.orgId);
        })
    ).subscribe(res => {
        this.connections = res;
    })
  }

}
