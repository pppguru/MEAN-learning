import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {UserService} from './../services/user.service';
import {EventService} from './../services/event.service';
import {SessionService} from './../services/session.service';
import {AuthService} from './../services/auth.service';

@Component({
  templateUrl: './forgotpassword.html',
  providers: [UserService]
})
export class ForgotPasswordComponent {
    public newPassword: string;
    public newPasswordConfirm: string; 
    public processing: boolean = false;

    private _subscription: Subscription;
    private _userIdentifier: string;

    constructor(private _activatedRoute: ActivatedRoute,
                private _userService: UserService,
                private _eventService: EventService,
                private _sessionService: SessionService,
                private _authService: AuthService,
                private _router: Router) {

    }

    ngOnInit() {
      this._sessionService.clearSessionInfo();
        this._subscription = this._activatedRoute.queryParams.subscribe(
          (param: any) => {
            this._userIdentifier = param['user'];
          });
    }

   ngOnDestroy() {
        // prevent memory leak by unsubscribing
        this._subscription.unsubscribe();
   }
    
    public submit() {
      this._userService.resetPassword(this.newPasswordConfirm, this._userIdentifier)
        .subscribe(
          response => this._handleResponse(response),
          error => this._handleError(error,'There was a problem resetting your password.  Please be patient while we resolvel this issue')
      );
    }

  public formKeyup(e): void {
    //submit on enter keyCode 
    if (e.keyCode === 13 && this.loginButtonState())
      this.submit();
  }

    public loginButtonState():boolean {
      return this.newPassword == null ||
        this.newPassword.length < 8 || 
        this.newPasswordConfirm == null ||
        this.newPasswordConfirm.length < 8 ||
        (this.newPassword !== this.newPasswordConfirm) ||
        this.processing;
    }

  private _handleResponse(user: any): void {
    this.processing = false;  
    this._sessionService.setUser(user);
    this._authService.saveUser(user);   
    this._router.navigate(['home']);
  }

  private _handleError(error, message): void {
    this._eventService.broadcast('error', message);
    console.error(error);
  }
}