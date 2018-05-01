import {UserTokenKey, UserInfoKey, GlobalAdministrator, StudyUser} from './../model/Constants';
import {User} from './../model/User';
import {JwtHelper} from 'angular2-jwt';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {SessionService} from './session.service';

@Injectable()
export class AuthService {
    jwt = new JwtHelper();
    constructor(private _router: Router,
                private _sessionService: SessionService) {}
    
    loggedIn() {
        if (localStorage[UserTokenKey] != null) {
            if (this.jwt.isTokenExpired(JSON.parse(localStorage[UserTokenKey]).token))
                return false;
                
            return true;    
        }
        
        return false;
    }

    logout() {
        localStorage.clear();
        this._sessionService.clearSessionInfo();
        this._router.navigate['home'];
    }

    getToken() :string {
        if (localStorage[UserTokenKey] != null) {
            return JSON.parse(localStorage[UserTokenKey]).token;
        } else {
            return null;
        }
    }

    getUser() :User {
        return <User>JSON.parse(localStorage[UserInfoKey]);
    }

    premierUser() : boolean {
        let userInfo: User;
        userInfo = this._sessionService.getUser();

      if (userInfo === undefined) {
          if (userInfo === undefined && localStorage[UserInfoKey]) 
              userInfo = <any>JSON.parse(localStorage[UserInfoKey]);
          else 
              return false;
      }

      if (!userInfo.hasOwnProperty('relations')) {
          this._sessionService.clearSessionInfo();
          return false;
      }
        

        let currentRole = userInfo.relations.role.name;
        return (currentRole === GlobalAdministrator ||
            currentRole === StudyUser);
    }
    
    saveToken(token) {
        localStorage.setItem(UserTokenKey, JSON.stringify(token));
    }
    
    saveUser(user) {
        localStorage.setItem(UserInfoKey, JSON.stringify(user));
    }
    
    tokenUserInfo() :User {
        if (localStorage[UserTokenKey] != null) {
        return <User>this.jwt.decodeToken(JSON.parse(localStorage[UserTokenKey]).token);
        } else {
            return null;
        }
    }
}