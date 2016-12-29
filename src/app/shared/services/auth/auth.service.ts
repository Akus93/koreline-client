import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {Router} from "@angular/router";
import {DOMAIN_NAME} from '../../global';

@Injectable()
export class AuthService {

  constructor(private http: Http, private router: Router) {}

  public login(email: string, password: string): Observable<string> {

    let options = {
        headers: new Headers({
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            })
    };
    let body = JSON.stringify({ email: email, password: password });
    let url = DOMAIN_NAME + '/auth/login/';

    return this.http.post(url, body, options)
                    .map((res: Response) => res.json().key)
                    .catch(this.handleError);
  }

  public logout(): void {
    let url = DOMAIN_NAME + '/auth/logout/';
    let options = {
        headers: new Headers({
             'Authorization': 'Token '+ this.getToken(),
            })
    };
    this.http.post(url, JSON.stringify({}), options)
             .subscribe(
               res => {
                 sessionStorage.clear();
                 this.router.navigate(['/']);
               }
             );
  }

  public changePassword(oldPassword: string, newPassword: string): Observable<any> {

    let url = DOMAIN_NAME + '/auth/password/change/';
    let options = {
      headers: new Headers({
        'Authorization': 'Token '+ this.getToken(),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
    let body = JSON.stringify({ old_password: oldPassword, new_password1: newPassword, new_password2: newPassword });

    return this.http.post(url, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  public isAuth(): boolean {
    return !!sessionStorage.getItem('token');
  }

  public isTeacher(): boolean {
    return sessionStorage.getItem('isTeacher') == 'true';
  }

  public getToken(): string {
    return sessionStorage.getItem('token');
  }

  public hasPhoto(): boolean {
    return !!sessionStorage.getItem('photo');
  }

  public getPhoto(): string {
    return sessionStorage.getItem('photo');
  }

  public getUsername(): string {
    return sessionStorage.getItem('username');
  }

  private handleError (error: Response ) {
    return Observable.throw(error.json());
  }
}
