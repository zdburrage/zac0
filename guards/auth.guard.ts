// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.auth.idTokenClaims$.pipe(
        switchMap(res => {
          if (res['https://zac0.herokuapp.com/roles'] && res['https://zac0.herokuapp.com/roles'].indexOf('SEC Admin') !== -1) {
            return of(true);
          } else {
            alert("User not permitted to access this page");
            return of(false);
          }
        })
      )

  }
}