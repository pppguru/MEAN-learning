import {Component, OnInit} from '@angular/core';
import {AccountService} from './account.service';
import {AnalyticsService} from './../services/analytics.service';

@Component({
  styles: [ ],
  providers: [AccountService],
  templateUrl: './accountconfirmation.html'
})
export class AccountConfirmationComponent implements OnInit {

  constructor(private _accountService: AccountService,
            private _analyticsService: AnalyticsService) {}

  ngOnInit() {
    this._analyticsService.pageView('/accountconfirmation.html');
  }

}
