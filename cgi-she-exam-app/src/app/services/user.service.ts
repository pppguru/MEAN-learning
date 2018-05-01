import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RootApiUrl, AuthHeaderKey } from './../model/Constants';
import { User } from './../model/User';
import { AuthService } from './../services/auth.service';

@Injectable()
export class UserService {
  constructor(private _http: Http,
              private _authService: AuthService) { }

  public getUser(id: string) {    
    let header = new Headers();
    header.append(AuthHeaderKey,this._authService.getToken());

    return this._http.get(RootApiUrl + '/users/' + id, {
      headers: header
    })
      .map((response: Response) => <User>response.json())
      //.do(data => console.log(data))
      .catch(this.handleError);
  }

  public resetPassword(newPassword: string, userId: string) {
    const pass = {'newPassword': newPassword };
     return this._http.post(`${RootApiUrl}/users/${userId}/resetpassword`, pass, {
    })
      .map((response: Response) => <any>response)
      //.do(data => console.log(data))
      .catch(this.handleError);     
  }

  private handleError(error: Response) {
    return Observable.throw(error);
  }
}