import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { UserProfile } from '../../models/userProfile.model';


@Injectable()
export class UserService {

  constructor(private http: Http) { }

  public getCurrentUser(token: string): Observable<UserProfile> {

    let url = 'http://localhost:8000/api/user/edit-profile/';
    let options = {
        headers: new Headers({
             'Authorization': 'Token '+ token,
            })
    };

    return this.http.get(url, options)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }

  public patchCurrentUser(token: string, body): Observable<UserProfile> {

    let url = 'http://localhost:8000/api/user/edit-profile/';
    let options = {
      headers: new Headers({
        'Authorization': 'Token '+ token,
        'Content-Type': 'application/json'
      })
    };

    return this.http.patch(url, JSON.stringify(body), options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  public createUser(email: string, password: string, confirmPassword: string): Observable<string> {

    let url = 'http://localhost:8000/auth/registration/';
    let body = JSON.stringify({ email: email, password1: password, password2: confirmPassword });
    let options = {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(url, body, options)
      .map((res: Response) => res.json().key)
      .catch(this.handleError);
  }

  public updateUser(token: string, userProfile: UserProfile): Observable<JSON> {
    var body = {};
    for (const field in userProfile) {
      body[field] = userProfile[field];
    }
    let url = 'http://localhost:8000/api/user/update/';
    let options = {
      headers: new Headers({
        'Authorization': 'Token '+ token,
      })
    };
    return this.http.post(url, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private handleError (error: Response) {
    return Observable.throw(error.json());
  }

}
