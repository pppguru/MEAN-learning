import {Subscription} from 'rxjs';
import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {AccountService} from './../account/account.service';
import {EventService} from './../services/event.service';
import {AuthService} from './../services/auth.service';

@Component({
  selector: 'studyagreement',  
  providers: [AccountService],
  templateUrl: './agreement.html'
})
export class AgreementComponent implements OnInit, OnDestroy {
    constructor(private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _eventService: EventService,
              private _accountService: AccountService,
              private _authService: AuthService) {}
    
    private _subscription: Subscription;
    private _token: string;

    ngOnInit() {
        // subscribe to router event
        this._subscription = this._activatedRoute.queryParams.subscribe(
          (param: any) => {
            this._token = param['token'];

            this._accountService.premierStudyFinalize(this._token)        
              .subscribe(
                  response => this._handleAccountResponse(response),
                  error => this._handleError(error, 'There was an error updating your account')
              );
          });
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        this._subscription.unsubscribe();
   }

   _handleAccountResponse(response: any) {
     //success!  Logout and go back to home page
      this._authService.logout();
      event.preventDefault();
      event.stopPropagation();
      this._router.navigate(['login', {'Message': 'Your account has been upgraded.  Please login again'}]);
   }

   _handleError(error, message) {
      this._eventService.broadcast('error', message);
      console.error(error);
   }
}