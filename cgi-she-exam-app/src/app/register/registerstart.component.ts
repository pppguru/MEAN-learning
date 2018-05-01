import {Component, OnInit} from '@angular/core';
import {PasswordMinLength} from './../model/Constants';
import {RegistrationStartInfo} from './../model/Constants';
import {RegistrationService} from './register.service';
import {ValidationService} from './../services/validation.service';
import {RegistrationStart} from './../model/RegistrationStart';
import {LoginResponse} from './../model/LoginResponse';
import {UserService} from './../services/user.service';
import {AuthService as CGIAuth} from './../services/auth.service';
import {AnalyticsService} from './../services/analytics.service';
import {SessionService} from './../services/session.service';

import {Router} from '@angular/router';
import {NgForm, Validators} from '@angular/forms';
import {AuthService} from 'ng2-ui-auth';
import {Response} from '@angular/http';

@Component({
  providers: [RegistrationService, ValidationService, CGIAuth, AuthService, UserService],
  templateUrl: './registerstart.html'
})
export class RegisterStartComponent implements OnInit {
  validationMessage: string;
  rs: RegistrationStart;
  emailValid: boolean = true;

  constructor(private _regService: RegistrationService,
                private _router: Router,
                private _validator: ValidationService,
                private _oauth: AuthService,
                private _userService: UserService,
                private _analyticsService: AnalyticsService,
                private _authService: CGIAuth,
                private _sessionService: SessionService) {
      this.validationMessage = '';
      this.rs = new RegistrationStart();
  }

    _handleLoginResponse(lr: LoginResponse) {
    this._authService.saveToken(lr);
    
    this._userService.getUser(this._authService.tokenUserInfo().id)
      .subscribe(
          response => this._handleUserResponse(response)
      );
  }

    _handleUserResponse(user) {
    this._authService.saveUser(user);   
    this._router.navigate(['examstart']);
  }

  facebook() {
     this._oauthAuthenticate('facebook');
  }
  
  google() {
      this._oauthAuthenticate('google');
  }

  _oauthAuthenticate(provider: string) {
      let context = this;
      this._oauth.authenticate(provider)
        .subscribe(
            (response: Response) => context._handleLoginResponse(response.json()));
  }
  
  submitButtonState() {
      if (this.rs.email.length > 0
          && this.emailValid
          && this.rs.password.length >= PasswordMinLength
          && this.rs.passwordConfirmation.length >= PasswordMinLength
          && this.rs.password == this.rs.passwordConfirmation)
          return false;
      else
        return true;
  }

  emailValidation() {
      if (this.rs.email.length > 0) {
          if (!this._validator.emailIsValid(this.rs.email)) {
            this.emailValid = false;
            this.validationMessage = 'Email address is invalid';
          }
          else {
            this.emailValid = true;
            this.validationMessage = '';
         } 
      } 
  }
  
  register(event) {
      //Verify email address is unique
      
      //Set data for usage later
      this._sessionService.setRegistrationStart(this.rs);
      //Redirect to register.component
      this._router.navigate(['register']);
      event.preventDefault();
      event.stopPropagation();
  }
  
  ngOnInit() {
      this._analyticsService.pageView('/registerstart.html');
  }

  public formKeyup(e): void {
    //submit on enter keyCode 
    if (e.keyCode === 13 && !this.submitButtonState())
      this.register(e);
  }

}
