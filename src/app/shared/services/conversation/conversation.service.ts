import { Injectable } from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Conversation} from "../../models/conversation.model";

@Injectable()
export class ConversationService {

  constructor(private http: Http) { }

  public createConversation(token: string, lesson: string, student: string): Observable<Conversation> {

    let url = 'http://localhost:8000/api/room/open/';
    let body = JSON.stringify({ lesson: lesson, student: student});
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

  public getConversation(token: string, key: string): Observable<Conversation> {

    let url = 'http://localhost:8000/api/room/' + key + '/';
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

  private handleError (error: Response) {
    return Observable.throw(error.json());
  }

}
