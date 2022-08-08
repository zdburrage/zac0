import { Component, OnInit } from '@angular/core';
import { AuthClientConfig, AuthService, User } from '@auth0/auth0-angular';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { catchError, of, switchMap } from 'rxjs';
import { ApiService } from '../../../app/api.service';
import {Game, Schedule} from '../../models/schedule';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css'],
})
export class ProfileFormComponent {
  audience = this.configFactory.get()?.audience;
  public user: User = undefined;

  public secForm = this.formBuilder.group({
    id: '',
    division: ['', Validators.required]
  });
  public state: string = undefined;
  public session_token: any = undefined;

  constructor(
    private api: ApiService,
    private configFactory: AuthClientConfig,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe(res => {
      this.user = res;
    });
    this.route.queryParams.subscribe(res => {
      this.state = res?.state;
      this.session_token = jwt_decode(res?.session_token);
      console.log(this.session_token);
    })

    var secret = 'FC9FIgLorMEim0RnlID8yrYlwb5YR8Hp';
    
  }

  public submitForm(): void {
    if (this.secForm.valid) {
      this.api.postSecInfo(this.session_token?.user_id, this.secForm.value).subscribe(res => {
        if (res) {
          window.location.href = `https://auth.zacsandbox.com.com/continue?state=${this.state}`;
        }
      });
    }
  }
}
