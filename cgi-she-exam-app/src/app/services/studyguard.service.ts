import {AuthService} from './auth.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
 
@Injectable()
export class StudyGuardService implements CanActivate {
  constructor(private _router: Router,
             private _authService: AuthService) {}
 
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this._authService.loggedIn() && this._authService.premierUser()) {
      return true;
    }
 
    if (!this._authService.loggedIn()) {
        this._router.navigate(['login']);
        return false;
    }

    if (!this._authService.premierUser()) {
        this._router.navigate(['examstart']);
        return false;
    }
  }
}