import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { UserProfile } from '../../models/user.model';


@Injectable()
export class UserService {

  constructor(private http: Http) { }

  public getCurrentUser(token: string): Observable<UserProfile> {

    let url = 'http://localhost:8000/api/user/';
    let options = {
        headers: new Headers({
             'Authorization': 'Token '+ token,
            })
    };

    return this.http.get(url, options)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.log(errMsg);
    return Observable.throw(errMsg);
  }

}
