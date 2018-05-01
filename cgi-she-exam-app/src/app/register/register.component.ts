import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Registration} from './../model/Registration';
import {RegistrationStartInfo} from './../model/Constants';
import {UserAccount} from './../model/dto/UserAccount';

import {RegistrationStart} from './../model/RegistrationStart';

import {CountryCodeService} from './../services/countrycode.service';
import {StateService} from './../services/state.service';
import {DayService} from './../services/day.service';
import {MonthService} from './../services/month.service';
import {YearService} from './../services/year.service';
import {RegistrationService} from './register.service';
import {AuthService} from './../services/auth.service';
import {AnalyticsService} from './../services/analytics.service';
import {EventService} from './../services/event.service';
import {SessionService} from './../services/session.service';
import {UserService} from './../services/user.service';

import {CountryCode} from './../model/CountryCode';
import {Day} from './../model/Day';
import {Month} from './../model/Month';
import {Address} from './../model/Address';

var _ = require('lodash');

@Component({
  selector: 'register', 

  providers: [CountryCodeService, DayService,
    MonthService, YearService, StateService, RegistrationService,
    UserService
    ],

  templateUrl: './register.html'
})
export class RegisterComponent implements OnInit {
  // Set default values
  ur: Registration;
  rs: RegistrationStart;
  countryCodes: CountryCode[];
  years: string[];
  states: string[];
  months: Month[];
  nationalities: any[];
  days: Day[];
  updatePasswordEnabled: boolean = true;
  showSuccess: boolean = false;
  working: boolean = false;

  // TypeScript public modifiers
  constructor(private _countryCodeService: CountryCodeService,
              private _dayService: DayService,
              private _monthService: MonthService,
              private _yearService: YearService,
              private _stateService: StateService,
              private _regService: RegistrationService,
              private _router: Router,
              private _sessionService: SessionService,
              private _authService: AuthService,
              private _analytics: AnalyticsService,
              private _eventService: EventService,
              private _userService: UserService) {
      this.ur = new Registration();
      this.ur.address = new Address();
      this.countryCodes = _countryCodeService.countryCodes();
      this.years = _yearService.years();
      this.months = _monthService.months();
      this.days = _dayService.days();
      this.states = _stateService.states();
  }
  
  submitButtonState() {
    if (this.working)
      return true;

      if (this.ur.firstName.length > 0
          && this.ur.lastName.length > 0)
          return false;
      else
        return true;
  }
  
  submitRegistration() {
    this.working = true;
      let userAccount = new UserAccount().setPayload(this.ur);
      let payload = userAccount.getPayload();
      this._regService.postRegistration(payload)
        .subscribe(
            response => this._handleRegistrationResponse(response),
            error => this._handleError(error, 'Use the Reset Password if you already have an account')
        );
  }

  _handleRegistrationResponse(response) {
    this._authService.saveToken(response);
    
    this._userService.getUser(this._authService.tokenUserInfo().id)
      .subscribe(
          response => this._handleUserResponse(response)
      );

      this.working = false;
  }

  _handleUserResponse(user) {
    //show success confirmation
    this.showSuccess = true;   
    this._authService.saveUser(user);   
  }

  _handleError(error, message) {
    this._eventService.broadcast('error', message);
    console.error(error);

    this.working = false;
  }
  
  ngOnInit() {
    const startInfo = this._sessionService.getRegistrationStart();
    if (startInfo != undefined) {
      this.ur.email = startInfo.email;
      this.ur.password = startInfo.password;
      this.ur.passwordConfirmation = startInfo.passwordConfirmation;
    } else {
      this._router.navigateByUrl('registerstart');
    }

    this._analytics.pageView('/register.html');
  }

  goToExam() {
    this._router.navigateByUrl('examstart');
  }

}
