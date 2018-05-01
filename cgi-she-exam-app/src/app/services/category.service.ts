import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RootApiUrl, AuthHeaderKey } from './../model/Constants';
import { AuthService } from './../services/auth.service';
import { Category } from './../model/Category';

@Injectable()
export class CategoryService {
  constructor(private _http: Http,
             private _authService: AuthService) { }
             
    categories() {
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        headers.append(AuthHeaderKey,this._authService.getToken());
        let userId = this._authService.getUser().id;
    
        return this._http.get(`${RootApiUrl}/categories`, {
          headers: headers
        })
          .map((response: Response) => <Category[]>response.json())
          .catch(this.handleError);
    }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw('Server error');
  }
}