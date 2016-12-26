import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {Message} from "../../models/message.model";
import {DOMAIN_NAME} from '../../global';

@Injectable()
export class MessageService {

  domain: string;

  constructor(private http: Http) {
    this.domain = DOMAIN_NAME;
  }

  sendMessage(token: string, reciver: string, text: string): Observable<Message> {

    let url = this.domain + '/api/messages/';
    let options = {
      headers: new Headers({
        'Authorization': 'Token '+ token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
    let body = JSON.stringify({ reciver: reciver, text: text });

    return this.http.post(url, body, options)
      .map((response: Response) => response.json())
      .catch(this.handleError)
  }

  private handleError (error: Response) {
    return Observable.throw(error.json());
  }

}
