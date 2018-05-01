import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RootApiUrl } from './../model/Constants';
import { LoginResponse} from './../model/LoginResponse';

@Injectable()
export class LoginService {
  constructor(private _http: Http) { }

  public postLogin(username:string, password:string):any {
    let instance = this;
    let header = new Headers();
    header.append('Content-Type','application/json');
    var credentials = JSON.stringify({email: username.toLowerCase(), password: password});
    
    return this._http.post(RootApiUrl + '/login',credentials, {
      headers: header
    })
      .map((response: Response) => <LoginResponse>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error);
  }
}