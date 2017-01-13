import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { UserProfile } from '../../models/userProfile.model';


@Injectable()
export class UserService {

  constructor(private http: Http) { }

  public getCurrentUserProfile(token: string): Observable<UserProfile> {

    let url = 'http://localhost:8000/api/user/my-profile/';
    let options = {
        headers: new Headers({
             'Authorization': 'Token '+ token,
             'Accept': 'application/json'
            })
    };

    return this.http.get(url, options)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }

  public patchCurrentUserProfile(token: string, username: string, body: any): Observable<UserProfile> {

    let url = 'http://localhost:8000/api/users/' + username + '/';
    let options = {
      headers: new Headers({
        'Authorization': 'Token '+ token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };

    return this.http.patch(url, JSON.stringify(body), options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  public getUserProfile(username: string): Observable<UserProfile> {

    let url = 'http://localhost:8000/api/users/' + username +'/';
    let options = {
      headers: new Headers({
        'Accept': 'application/json'
      })
    };

    return this.http.get(url, options)
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  public buyTokens(token: string, amount: number): Observable<UserProfile> {

    let url = 'http://localhost:8000/api/user/tokens/buy/';
    let body = JSON.stringify({ amount: amount });
    let options = {
      headers: new Headers({
        'Authorization': 'Token '+ token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };

    return this.http.post(url, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  public sellTokens(token: string, amount: number): Observable<UserProfile> {

    let url = 'http://localhost:8000/api/user/tokens/sell/';
    let body = JSON.stringify({ amount: amount });
    let options = {
      headers: new Headers({
        'Authorization': 'Token '+ token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };

    return this.http.post(url, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  public createUser(email: string, password: string, confirmPassword: string): Observable<string> {

    let url = 'http://localhost:8000/auth/registration/';
    let body = JSON.stringify({ email: email, password1: password, password2: confirmPassword });
    let options = {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };

    return this.http.post(url, body, options)
      .map((res: Response) => res.json().key)
      .catch(this.handleError);
  }

  private handleError (error: Response) {
    return Observable.throw(error.json());
  }

}
