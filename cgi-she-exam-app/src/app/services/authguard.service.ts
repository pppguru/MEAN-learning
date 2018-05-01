import {AuthService} from './auth.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
 
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private _router: Router,
             private _authService: AuthService) {}
 
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this._authService.loggedIn()) {
      return true;
    }
 
    this._router.navigate(['login']);
    return false;
  }
}