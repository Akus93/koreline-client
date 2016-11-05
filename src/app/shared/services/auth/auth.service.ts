import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {

  constructor(private http: Http) {}

  public login(email: string, password: string): Observable<string> {

    let options = {
        headers: new Headers({
             'Content-Type': 'application/json',
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
               res => localStorage.removeItem('token')
             );
  }

  public isAuth(): boolean{
    return !!localStorage.getItem('token');
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  private handleError (error: Response ) {
    return Observable.throw(error.json());
  }
}
