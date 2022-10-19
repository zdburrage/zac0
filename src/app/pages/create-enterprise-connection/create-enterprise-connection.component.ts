import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { WebAuth } from 'auth0-js'
import { ApiService } from 'src/app/api.service';
import { EnterpriseConnection } from 'src/app/models/ent-connection';

@Component({
  selector: 'app-create-enterprise-connection',
  templateUrl: './create-enterprise-connection.component.html',
  styleUrls: ['./create-enterprise-connection.component.css'],
})
export class CreateEnterpriseConnectionComponent {

  @Input() error: string | null;
  @Output() submitEM = new EventEmitter();

  public connectionForm = this.formBuilder.group({

    options: this.formBuilder.group({
      domain: ['', Validators.required],
      client_id: ['', Validators.required],
      use_wsfed: [false, Validators.required],
      ext_groups: [false, Validators.required],
      ext_profile: [false, Validators.required],
      identity_api: ['', Validators.required],
      basic_profile: [false, Validators.required],
      client_secret: ['', Validators.required],
      tenant_domain: ['', Validators.required],
      waad_protocol: ['', Validators.required],
      domain_aliases: [[], Validators.required],
      should_trust_email_verified_connection: "never_set_emails_as_verified"
    }),
    strategy: ['', Validators.required],
    name: ['', Validators.required],
    is_domain_connection: [false, Validators.required],
    show_as_button: [false, Validators.required],
    display_name: ['', Validators.required],
    api_enable_users: ['', Validators.required],
    ext_nested_groups: ['', Validators.required],
  });

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });


  constructor(public auth: AuthService,
              public route: ActivatedRoute,
              private formBuilder: FormBuilder,
               private apiService: ApiService) {
    
  }

  submitForm() {
    var data = new EnterpriseConnection(this.connectionForm.value);
    this.apiService.postCreateConnection(data).subscribe(res => {

    });
  }
}
