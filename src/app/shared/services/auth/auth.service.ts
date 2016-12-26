import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {Router} from "@angular/router";

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
    let url = 'http://localhost:8000/auth/login/';

    return this.http.post(url, body, options)
                    .map((res: Response) => res.json().key)
                    .catch(this.handleError);
  }

  public logout(): void {
    let url = 'http://localhost:8000/auth/logout/';
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
