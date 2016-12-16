import { Injectable } from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Notification} from "../../models/notification.model";

@Injectable()
export class NotificationService {

  constructor(private http: Http) { }

  getNotifications(token: string): Observable<Notification> {

    let url = 'http://localhost:8000/api/notifications/';
    let options = {
      headers: new Headers({
        'Authorization': 'Token '+ token,
        'Accept': 'application/json'
      })
    };

    return this.http.get(url, options)
      .map((response: Response) => response.json())
      .catch(this.handleError)
  }

  private handleError (error: Response) {
    return Observable.throw(error.json());
  }

}
