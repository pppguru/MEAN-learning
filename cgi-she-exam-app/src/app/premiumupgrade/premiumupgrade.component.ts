import {Subscription } from 'rxjs';
import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';

import {EventService} from './../services/event.service';
import {AccountService} from './../account/account.service';
import {AnalyticsService} from './../services/analytics.service';
import {AuthService} from './../services/auth.service';
import {UtilService} from './../services/util.service';

import {MonthService} from './../services/month.service';
import {YearService} from './../services/year.service';

@Component({
  selector: 'premiumupgradecomponent',  
  providers: [AccountService, MonthService, YearService, UtilService],
  templateUrl: './premiumupgradecomponent.html'
})
export class PremiumUpgradeComponent implements OnInit {
    activatingStudy: boolean = false;
    premieruser: boolean = false;
    showCC: boolean = false;

    months: string[];
    years: string[];

    ccCardNumber: string;
    ccMonth: string;
    ccYear: string;
    ccCCV: string;
    
    constructor(private _eventService: EventService,
             private _accountService: AccountService,
             private _analyticsService: AnalyticsService,
             private _authService: AuthService,
             private _monthService: MonthService,
             private _yearService: YearService,
             private _utilService: UtilService,
             private _router: Router) {}

    ngOnInit() {
      this._analyticsService.pageView('/premiumupgrade.html');
      this.premieruser = this._authService.premierUser();

      this.months = this._monthService.CCMonths();
      this.years = this._yearService.CCYears();
    }

  activate() {
    this.activatingStudy = true;
    this._accountService.premierStudyActivate()
      .subscribe(
        response => this._handleStudyActivateResponse(response),
        error => this._handleError(error, 'There was an error upgrading your account')
      );
  }

  submitPayment() {
    this.activatingStudy = true;

    const ccInfo = {
      "ACCT": this.ccCardNumber,
      "EXPDATE": `${this.ccMonth}${this.ccYear.substr(2,2)}`,
      "CVV2": this.ccCCV,
      "AMT": "4.99",
      "PROFILENAME": this._authService.getUser().id,
      "START": this._utilService.billStartDate(),
      "TERM": "0",
      "PAYPERIOD": "MONT",
      "TENDER": "C"
    }
    this._accountService.premierStudyPaymentActivate(ccInfo)
      .subscribe(
        response => this._handleStudyPaymentActivateResponse(),
        error => this._handlePayflowResponse(error)
      );
  }

  cancel() {
      this._accountService.premierStudyCancel()
        .subscribe(
        response => this._handleStudyCancel(),
        error => this._handleError(error, 'There was an error downgrading your account')
      );  
  }

  private _handleStudyCancel() {
      //Logout and go back to home page
      this._authService.logout();
      event.preventDefault();
      event.stopPropagation();
      this._router.navigate(['login', {'Message': 'Your account has been downgraded.  Please login again'}]);
  }

  enterCC() {
    this.showCC = true;
  }

  paymentDisabled(): boolean {
    let disabled = true;
    
    if (this.ccCardNumber !== undefined && 
        (this.ccCardNumber.toString().length == 15 ||
        this.ccCardNumber.toString().length == 16) &&
        this.ccMonth !== undefined &&
        this.ccYear !== undefined &&
        this.ccCCV !== undefined && 
        (this.ccCCV.toString().length == 3 ||
        this.ccCCV.toString().length == 4))
        disabled = false;

    return disabled;
  }

  _handlePayflowResponse(error: any): void {
    //precondition failed
    if (error.status == 412) {
      this._handleError(error,'Your credit card was not authorized');
    } else {
      this._handleError(error, 'There was a problem upgrading your account');
    }
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

  _handleStudyPaymentActivateResponse() {
    this.activatingStudy = false;
    //success!  Logout and go back to home page
      
    this._authService.logout();
    event.preventDefault();
    event.stopPropagation();
    this._router.navigate(['login', {'Message': 'Your account has been upgraded.  Please login again'}]);
  }
}