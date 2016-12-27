import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {Message} from "../../models/message.model";
import {DOMAIN_NAME} from '../../global';

@Injectable()
export class MessageService {


  constructor(private http: Http) {}

  sendMessage(token: string, reciver: string, title: string, text: string): Observable<Message> {

    let url = DOMAIN_NAME + '/api/messages/';
    let options = {
      headers: new Headers({
        'Authorization': 'Token '+ token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
    let body = JSON.stringify({ reciver: reciver, title: title, text: text });

    return this.http.post(url, body, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getUnreadMessages(token: string): Observable<Message[]> {

    let url = DOMAIN_NAME + '/api/messages/unread/';
    let options = {
      headers: new Headers({
        'Authorization': 'Token '+ token,
        'Accept': 'application/json'
      })
    };

    return this.http.get(url, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);

  }

  getInterlocutors(token: string): Observable<any> {

    let url = DOMAIN_NAME + '/api/messages/';
    let options = {
      headers: new Headers({
        'Authorization': 'Token '+ token,
        'Accept': 'application/json'
      })
    };

    return this.http.get(url, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);

  }

  getMessagesWithUser(token: string, username: string): Observable<Message[]> {

    let url = DOMAIN_NAME + '/api/messages/' + username + '/';
    let options = {
      headers: new Headers({
        'Authorization': 'Token '+ token,
        'Accept': 'application/json'
      })
    };

    return this.http.get(url, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  markAsRead(token: string, message: Message): Observable<Message> {

    let url = DOMAIN_NAME + '/api/messages/';
    let options = {
      headers: new Headers({
        'Authorization': 'Token '+ token,
        'Accept': 'application/json'
      })
    };
    let body = {
      id: message.id
    };

    return this.http.put(url, body, options)
      .map((response: Response) => response.json())
      .catch(this.handleError)
  }

  private handleError (error: Response) {
    return Observable.throw(error.json());
  }

}
