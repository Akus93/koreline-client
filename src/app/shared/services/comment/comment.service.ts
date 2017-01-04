import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";

import {DOMAIN_NAME} from '../../global';
import {Comment} from '../../models/comment.model';



@Injectable()
export class CommentService {

  constructor(private http: Http) { }


  public getTeacherComments(username: string): Observable<Comment[]> {

    let url = DOMAIN_NAME + '/api/comments/' + username + '/';
    let options = {
      headers: new Headers({
        'Accept': 'application/json'
      })
    };

    return this.http.get(url, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  public createComment(token: string, teacher: string, text: string, rate: number): Observable<Comment> {

    let url = DOMAIN_NAME + '/api/comments/create/';
    let body = JSON.stringify({ teacher: teacher, text: text, rate: rate });
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

  private handleError (error: Response) {
    return Observable.throw(error.json());
  }
}
