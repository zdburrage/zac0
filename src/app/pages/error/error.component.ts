import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
})
export class ErrorComponent {

  public error$: Observable<any> = this.auth.error$;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    timer(0).pipe(takeUntil(this.error$)).subscribe(() => {
      this.router.navigateByUrl('/');
    });

    this.auth.error$.subscribe(res => {
      if (res.name === 'access_denied') {
        window.location.href = `https://login.zacsandbox.com/v2/logout?returnTo=https%3A%2F%2Fwww.zacsandbox.com&client_id=SRxPnDsqhkiccvGny0rzX3RECajkDK6F&auth0Client=eyJuYW1lIjoiQGF1dGgwL2F1dGgwLWFuZ3VsYXIiLCJ2ZXJzaW9uIjoiMS4xMC4wIiwiZW52Ijp7ImFuZ3VsYXIvY29yZSI6IjEzLjMuMTEifX0%3D`
      }
    })
  }
}

