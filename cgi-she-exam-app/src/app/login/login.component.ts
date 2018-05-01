import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from 'ng2-ui-auth';
import {Response} from '@angular/http';

import {LoginService} from './login.service';
import {SessionService} from './../services/session.service';
import {UserService} from './../services/user.service';
import {AuthService as CGIAuth} from './../services/auth.service';
import {AnalyticsService} from './../services/analytics.service';
import {EventService} from './../services/event.service';
import {AccountService} from './../account/account.service';
import {LoginResponse} from './../model/LoginResponse';
import {UserTokenKey} from './../model/Constants';
import {UserInfoKey} from './../model/Constants';
import {User} from './../model/User';

@Component({
  providers: [
    LoginService, UserService, CGIAuth, AuthService, AccountService
  ],
  templateUrl: './login.html'
})
export class LoginComponent implements OnInit {
  // Set our default values
  public username: string;
  public password: string;
  public errorMessage: string;
  public loginDisplay: boolean = false;
  public processing: boolean = false;
  public notification: string = "";
  public resetEmail: string;
  public oauthLogin: boolean = false;
  
  constructor(private _loginService: LoginService,
              private _sessionService: SessionService,
              private _userService: UserService,
              private _authService: CGIAuth,
              private _eventService: EventService,
              private _accountService: AccountService,
              private _router: Router,
              private _route: ActivatedRoute,
              private _oauth: AuthService,
              private _analytics: AnalyticsService) {
    this.errorMessage = '';
  }

  public submitLogin():void {
   this.processing = true;
    
   this._loginService.postLogin(this.username, this.password)
    .subscribe(
      response => this._handleLoginResponse(response),
      error => this._handleError(error)
    );
  }

  public formKeyup(e):void {
    //submit on enter keyCode 
    if (e.keyCode === 13 && !this.loginButtonState())
      this.submitLogin();
  }
  
  private _handleLoginResponse(lr: LoginResponse):void {
    this._authService.saveToken(lr);
    
    this._userService.getUser(this._authService.tokenUserInfo().id)
      .subscribe(
          response => this._handleUserResponse(response),
          error => this._handleError(error)
      );
  }
  
  private _handleUserResponse(user):void {
    this.processing = false;  
    this._sessionService.setUser(user);
    this._authService.saveUser(user);   
    this._router.navigate(['home']);
  }
  
  private _handleError(e):void {
    if (e.status === 401) {
      this.errorMessage = 'Login Failed';
      this.processing = false;
    }
  }
  
  public loginButtonState():boolean {
      return this.password == null ||
        this.password.length < 8 || 
        this.username == null ||
        this.processing;
  }
  
  public facebook():void {
     this.oauthLogin = true;
     this._oauthAuthenticate('facebook');
  }
  
  public google():void {
      this.oauthLogin = true;
      this._oauthAuthenticate('google');
  }

  public register():void {
    this._router.navigate(['registerstart']);
  }

  public showLogin():void {
    this.loginDisplay = true;
  }

  private _oauthAuthenticate(provider: string) {
      let context = this;
      this._oauth.authenticate(provider)
          .subscribe(
                  (response: Response) => context._handleLoginResponse(response.json()),
                  (error: any) => console.error(`Error through handler: ${error.toString()}`)
               );
  }
  
  ngOnInit() {
    const message = this._route.snapshot.params["Message"];
    if (message != null) {
      this.notification = message;
    }

    this._analytics.pageView('/login.html');
  }

  public resetConfirmDisabled(): boolean {
    let disabled: boolean = this.resetEmail === undefined ||
      this.resetEmail === null ||
      this.resetEmail.indexOf('@') === -1;

    if (disabled)
      return true;

    return false;
  }

  public confirmReset():void {
    this._sessionService.clearSessionInfo();
    const context = this;
    this._accountService.resetPassword(this.resetEmail)
    .subscribe(
            (response: Response) => context._handleResetResponse(),
            (error: any) => this._handleResetError(error)
          );
  }

  private _handleResetError(error: any):void {
    if (error.status == 404)
      this._eventService.broadcast('error', 'Sorry, your email address was not found in our database');
    else
      this._eventService.broadcast('error', error.toString());
  }

  private _handleResetResponse():void {
    this._sessionService.clearSessionInfo();
    this._eventService.broadcast('info', 'You will received an email with instructions to reset your password');
  }

}
