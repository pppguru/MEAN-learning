import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RootApiUrl, AuthHeaderKey } from './../model/Constants';
import { AuthService } from './auth.service';

@Injectable()
export class LoggingService {
  constructor(private _http: Http,
              private _authService: AuthService) { }

  postError(error: any) {
    let header = new Headers();
    header.append('Content-Type','application/json');
    header.append(AuthHeaderKey,this._authService.getToken());

    let errorObject = {message: '', stacktrace: '', useragent: navigator.userAgent}
    if (error.hasOwnProperty('message')) {
        errorObject.message = error.message;
    }

    if (error.hasOwnProperty('stacktrace')) {
        errorObject.stacktrace = error.stacktrace;
    }
 
    return this._http.post(RootApiUrl + '/logging',JSON.stringify(errorObject), {
      headers: header
    })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error);
  }
}