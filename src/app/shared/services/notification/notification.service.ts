import { Injectable } from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Notification} from "../../models/notification.model";
import {DOMAIN_NAME} from '../../global';

@Injectable()
export class NotificationService {

  constructor(private http: Http) { }

  getNotifications(token: string): Observable<Notification[]> {

    let url = DOMAIN_NAME + '/api/notifications/';
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

  markAsRead(token: string, notification: Notification): Observable<Notification> {

    let url = DOMAIN_NAME + '/api/notifications/';
    let options = {
      headers: new Headers({
        'Authorization': 'Token '+ token,
        'Accept': 'application/json'
      })
    };
    let body = {
      id: notification.id
    };

    return this.http.put(url, body, options)
      .map((response: Response) => response.json())
      .catch(this.handleError)
  }

  private handleError (error: Response) {
    return Observable.throw(error.json());
  }

}
