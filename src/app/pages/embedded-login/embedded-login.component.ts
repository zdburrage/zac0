import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { WebAuth } from 'auth0-js'

@Component({
  selector: 'app-embedded-login',
  templateUrl: './embedded-login.component.html',
  styleUrls: ['./embedded-login.component.css'],
})
export class EmbeddedLoginComponent {

  @Input() error: string | null;
  @Output() submitEM = new EventEmitter();

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  webAuth = new WebAuth({
    domain:       'zacsandbox.us.auth0.com',
    clientID:     'SRxPnDsqhkiccvGny0rzX3RECajkDK6F',
    redirectUri: 'http://localhost:4200'
  });

  constructor(public auth: AuthService, public route: ActivatedRoute) {
    
  }

  submit() {
    if (this.form.valid) {
      this.webAuth.login({
        realm: 'Username-Password-Authentication',
        email: this.form.controls['email'].value,
        password: this.form.controls['password'].value,
        responseType: 'token',
        onRedirecting: function (done) {
          done();
        }
      })
    }
  }
}
