import {Component, ViewEncapsulation, OnInit, Inject} from '@angular/core';
import {AuthService} from './services/auth.service';
import {EventService} from './services/event.service';

@Component({
  selector: 'app',
  templateUrl: './app.component.html'
})

export class App implements OnInit {
  public url = 'http://www.commongroundinternational.com';
  public currentYear = new Date().getFullYear();
  public showErrorModal: boolean = false;
  public errorMessage: string = '';
  public showInfoModal: boolean = false;
  public infoMessage: string = '';

  constructor(private _authService: AuthService,
              private _eventService: EventService) {}

  loggedIn() {
    return this._authService.loggedIn();
  }

  studyAccess() {
    return this._authService.loggedIn() && this._authService.premierUser();
  }

  loggedInUser() {
    var user = this._authService.tokenUserInfo();
    if (user !== null) {
      let name = user.firstName;
      if (name.length <= 10) {
        if (name.length + user.lastName.length <= 15)
          return `${user.firstName} ${user.lastName}`;
        else {
          if (user.lastName.length >= 4)  
            return `${user.firstName} ${user.lastName.substr(0,4)}`;
          else
            return `${user.firstName}...`;
        }
      } else
        return user.firstName;
    }
  }

  ngOnInit() {
   const appInstance = this;
        this._eventService.on('error', function(message) {
            appInstance.showErrorModal = true;
            appInstance.errorMessage = message;
        });

        this._eventService.on('info', function(message) {
            appInstance.showInfoModal = true;
            appInstance.infoMessage = message;
        });
  }

  public closeErrorModal(): void {
    this.showErrorModal = false;
  }

  public closeInfoModal(): void {
    this.showInfoModal = false;
  }
}
