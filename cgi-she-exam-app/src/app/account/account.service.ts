import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RootApiUrl, AuthHeaderKey } from './../model/Constants';
import { User } from './../model/User';
import { AuthService } from './../services/auth.service';

@Injectable()
export class AccountService {
  constructor(private _http: Http,
              private _authService: AuthService) { }

  putUser(user: any) {    
    let header = new Headers();
    header.append(AuthHeaderKey,this._authService.getToken());
    header.append('Content-Type','application/json');
    let authUser = this._authService.tokenUserInfo();
    user['id'] = authUser.id;
    let userData = JSON.stringify(user);
    return this._http.put(RootApiUrl + '/users/' + authUser.id, userData, {
      headers: header
    })
      .map((response: Response) => <User>response.json())
      .catch(this.handleError);
  }

  updateUserTelephone(telephone: any) {
    let header = new Headers();
    header.append(AuthHeaderKey,this._authService.getToken());
    header.append('Content-Type','application/json');
    let authUser = this._authService.tokenUserInfo();
    let telData = JSON.stringify(telephone);

    let url = `${RootApiUrl}/users/${authUser.id}/telephones`;
    if (telephone.hasOwnProperty('id') && telephone.id !== undefined){
      url += '/' + telephone.id;

      return this._http.put(url, telData, {
        headers: header
    })
      .map((response: Response) => <User>response.json())
      .catch(this.handleError);
    } else {

    return this._http.post(url, telData, {
      headers: header
    })
      .map((response: Response) => <User>response.json())
      .catch(this.handleError);
    }
  }

  updateUserAddress(address: any) {
    let header = new Headers();
    header.append(AuthHeaderKey,this._authService.getToken());
    header.append('Content-Type','application/json');
    let authUser = this._authService.tokenUserInfo();
    let addressData = JSON.stringify(address);

    let url = `${RootApiUrl}/users/${authUser.id}/addresses`;
    if (address.hasOwnProperty('id')){
      url += '/' + address.id;

      return this._http.put(url, addressData, {
        headers: header
    })
      .map((response: Response) => <User>response.json())
      .catch(this.handleError);
    } else {

    return this._http.post(url, addressData, {
      headers: header
    })
      .map((response: Response) => <User>response.json())
      .catch(this.handleError);
    }
  }

  premierStudyActivate() {
    let header = new Headers();
    header.append(AuthHeaderKey,this._authService.getToken());
    header.append('Content-Type','application/json');
    return this._http.post(RootApiUrl + '/payments/study/process',null, {
      headers: header
    })
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  premierStudyCancel() {
    let header = new Headers();
    header.append(AuthHeaderKey,this._authService.getToken());
    header.append('Content-Type','application/json');
    return this._http.post(RootApiUrl + '/payments/study/cancel',null, {
      headers: header
    })
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);    
  }

  premierStudyFinalize(token: string) {
    let header = new Headers();
    header.append(AuthHeaderKey,this._authService.getToken());
    header.append('Content-Type','application/json');
    let body = {token: token}
    return this._http.post(RootApiUrl + '/payments/study/finalize', body, {
      headers: header
    })
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  premierStudyPaymentActivate(info: any) {
    let header = new Headers();
    header.append(AuthHeaderKey,this._authService.getToken());
    header.append('Content-Type','application/json');
    return this._http.post(RootApiUrl + '/payments/study/payflowprocess',info, {
      headers: header
    })
      .map((response: Response) => <any>response)
      .catch(this.handleError);
  }

  public resetPassword(email: string) {
    let body = { 'email': email }
    return this._http.post(`${RootApiUrl}/users/resetpassword`, body, {
    })
      .map((response: Response) => <any>response)
      .catch(this.handleError);   
  }

  private handleError(error: Response) {
    return Observable.throw(error);
  }
}