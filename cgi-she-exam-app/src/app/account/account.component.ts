import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { UserInfoKey } from './../model/Constants';
import { User } from './../model/User';
import { Registration } from './../model/Registration';
import { AuthService } from './../services/auth.service';
import { AccountService } from './account.service';

import {UserAccount} from './../model/dto/UserAccount';

import {CountryCodeService} from './../services/countrycode.service';
import {StateService} from './../services/state.service';
import {DayService} from './../services/day.service';
import {MonthService} from './../services/month.service';
import {YearService} from './../services/year.service';
import {EventService} from './../services/event.service';
import {ValidationService} from './../services/validation.service';
import {UserService} from './../services/user.service';
import {AnalyticsService} from './../services/analytics.service';

import {CountryCode} from './../model/CountryCode';
import {Day} from './../model/Day';
import {Month} from './../model/Month';
import {Address} from './../model/Address';

@Component({
  selector: 'account', 
  providers: [CountryCodeService, StateService,
    DayService, MonthService, YearService, EventService,
    ValidationService, AccountService, UserService
  ],
  templateUrl: './account.html'
})
export class AccountComponent implements OnInit {
  activatingStudy: boolean = false;
  registration: Registration;
  updatePassword: boolean = false;
  countryCodes: CountryCode[];
  years: string[];
  states: string[];
  months: Month[];
  nationalities: any[];
  premieruser: boolean = false;
  days: Day[];
  emailValid: boolean = true;
  accountMessage: string;

  private _loading: boolean = false;

  constructor(private _authService: AuthService,
             private _countryCodeService: CountryCodeService,
             private _stateService: StateService,
             private _dayService: DayService,
             private _monthService: MonthService,
             private _yearService: YearService,
             private _eventService: EventService,
             private _validationService: ValidationService,
             private _accountService: AccountService,
             private _userService: UserService,
             private _analyticsService: AnalyticsService,
             private _router: Router) {
      this.countryCodes = _countryCodeService.countryCodes();
      this.years = _yearService.years();
      this.months = _monthService.months();
      this.days = _dayService.days();
      this.states = _stateService.states();
      this.registration = new Registration();
      this.accountMessage = '';
  }

  ngOnInit() {
      this.premieruser = this._authService.premierUser();
      this._updateRegistrationObject(null);
      this._analyticsService.pageView('/account.html');
  }

  submitButtonState() {
    if (this._loading)
        return true;

    if (this.registration.email.length > 0 &&
        this.registration.firstName.length > 0 &&
        this.registration.lastName.length > 0) {
          return false;
        }

    if (this.updatePassword) {
      if (this.registration.password != null && 
        this.registration.password.length >= 8 &&
        this.registration.passwordConfirmation != null && 
        this.registration.passwordConfirmation.length >= 8 &&
        this.registration.password === this.registration.passwordConfirmation) {
          return false;
        } else {
          return true;
        }
    }

    return true;
  }

    emailValidation() {
      if (this.registration.email.length > 0) {
          if (!this._validationService.emailIsValid(this.registration.email)) {
            return false;
          }
          else {
            return true;
         } 
      } 
  }

  submitAccount(): void {
    if (!this.emailValidation()) {
      this._validation('Email address is invalid');
      return;
    }

    this._loading = true;

      let userAccount = new UserAccount().setPayload(this.registration);
      let payload = userAccount.getPayload();
      this._accountService.putUser(payload)
        .subscribe(
            response => this._handleAccountResponse(response),
            error => this._handleError(error, 'There was an error updating your account')
        );

      if (payload.telephones !== undefined && payload.telephones.length > 0) {
      this._accountService.updateUserTelephone(payload.telephones[0])
        .subscribe(
            response => this._handleUserUpdate(),
            error => this._handleError(error, 'There was an error updating your account')
        );
      }

      if (payload.addresses !== undefined && 
          payload.addresses.length > 0 &&
          !payload.addresses[0].hasOwnProperty('id')) {
      this._accountService.updateUserAddress(payload.addresses[0])
        .subscribe(
            response => this._handleUserUpdate(),
            error => this._handleError(error, 'There was an error updating your account')
        );
      }
  }

  _handleAccountResponse(user: any): void {
    this._authService.saveUser(user);   
    this._updateRegistrationObject(user);
    this.accountMessage = 'Account updated successfully';

    this._loading = false;
  }

  _handleUserUpdate(): void {
      this._userService.getUser(this._authService.getUser().id)
        .subscribe(
            response => this._handleAccountResponse(response),
            error => this._handleError(error, 'There was an error updating your account')
      );
  }

  updatePasswordClick() {
    if (!this.updatePassword) {
      //reset the passwords if they choose not to update
      this.registration.password = null;
      this.registration.passwordConfirmation = null;
    }
  }

  logout(event) {
      this._authService.logout();
      event.preventDefault();
      event.stopPropagation();
      this._router.navigate(['home']);
  }

  /* Account Status */
  activate() {
    this.activatingStudy = true;
    this._accountService.premierStudyActivate()
      .subscribe(
        response => this._handleStudyActivateResponse(response),
        error => this._handleError(error, 'There was an error upgrading your account')
      );
  }

  cancel() {
      this.activatingStudy = true;
      this._accountService.premierStudyCancel()
        .subscribe(
        response => this._handleStudyCancel(),
        error => this._handleError(error, 'There was an error downgrading your account')
      );  
  }

  _validation(message) {
    this._eventService.broadcast('error',message);
  }

 _handleError(error, message) {
    this.activatingStudy = false;
    this._eventService.broadcast('error', message);
    console.error(error);
  }

  _handleStudyActivateResponse(response) {
    this.activatingStudy = false;
    window.location.href = response.redirectUrl;
  }

  private _handleStudyCancel() {
      //Logout and go back to home page
      this._authService.logout();
      event.preventDefault();
      event.stopPropagation();
      this._router.navigate(['login', {'Message': 'Your account has been downgraded.  Please login again'}]);
  }

  _updateRegistrationObject(user: User) {
    if (user == null) 
      user = this._authService.getUser();
    
    let userRegistration = new User(user.id, user.firstName, user.lastName,
      user.email, user.gender, user.dateOfBirth, user.relations);
    this.registration = userRegistration.getRegistration();
  }
}
