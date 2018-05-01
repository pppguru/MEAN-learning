import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RootApiUrl } from './../model/Constants';
import { UserAccount } from './../model/dto/UserAccount';
import { User } from './../model/User';

@Injectable()
export class RegistrationService {
  constructor(private _http: Http) { }

  postRegistration(ua:any) {
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    var userObject = JSON.stringify(ua);
    
    return this._http.post(RootApiUrl + '/users',userObject, {
      headers: headers
    })
      .map((response: Response) => <User>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}