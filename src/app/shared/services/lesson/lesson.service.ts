import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";
import {Lesson} from "../../models/lesson.model";


@Injectable()
export class LessonService {

  constructor(private http: Http ) { }

  getLessonsList(params): Observable<Lesson[]> {

    let query = '';
    if (params) {
      query = '?';
      for (let param in params) {
        query = query + param + '=' + params[param] + '&';
      }
      query = query.slice(0, -1);
    }

    let url = 'http://localhost:8000/api/lessons/' + query;
    let options = {
      headers: new Headers({
        'Accept': 'application/json'
      })
    };

    return this.http.get(url, options)
               .map((response: Response) => response.json())
               .catch(this.handleError)
  }

  getLesson(slug: string): Observable<Lesson> {

    let url = 'http://localhost:8000/api/lessons/' + slug;
    let options = {
      headers: new Headers({
        'Accept': 'application/json'
      })
    };

    return this.http.get(url, options)
      .map((response: Response) => response.json())
      .catch(this.handleError)
  }

  public createLesson(token: string, title: string, subject: string, price: number): Observable<Lesson> {

    let url = 'http://localhost:8000/api/lessons/';
    let body = JSON.stringify({ title: title, subject: subject, price: price });
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
