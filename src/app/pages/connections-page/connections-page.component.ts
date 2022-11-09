import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { switchMap } from 'rxjs';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-connections-page',
  templateUrl: './connections-page.component.html',
  styleUrls: ['./connections-page.component.css'],
})
export class ConnectionsPageComponent implements OnInit {

  connections: [];


  constructor(public auth: AuthService,
              public route: ActivatedRoute,
              private formBuilder: FormBuilder,
               private apiService: ApiService,
               private router: Router) {
    
  }

  ngOnInit() {

    this.apiService.getConnections().subscribe(res => {
      this.connections = res;
    })
  }

  deleteConnection(id: number) {
    this.apiService.deleteConnection(id).pipe(
        switchMap(res => {
            return this.apiService.getConnections();
        })
    ).subscribe(res => {
        this.connections = res;
    })
  }

}
