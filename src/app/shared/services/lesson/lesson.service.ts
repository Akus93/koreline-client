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

  getCurrentUserLessons(token: string): Observable<Lesson[]> {

    let url = 'http://localhost:8000/api/user/my-lessons/';
    let options = {
      headers: new Headers({
        'Authorization': 'Token '+ token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };

    return this.http.get(url, options)
      .map((response: Response) => response.json().map(item => item.lesson))
      .catch(this.handleError)
  }

  public createLesson(token: string, title: string, subject: string, stage: string, price: number): Observable<Lesson> {

    let url = 'http://localhost:8000/api/lessons/';
    let body = JSON.stringify({ title: title, subject: subject, stage: stage, price: price });
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


  public joinLesson(token: string, slug: string): Observable<Lesson> {

    let url = 'http://localhost:8000/api/lessons/join/';
    let body = JSON.stringify({ lesson: slug });
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

  public leaveLesson(token: string, slug: string): Observable<Response> {

    let url = 'http://localhost:8000/api/lessons/leave/';
    let body = JSON.stringify({ lesson: slug });
    let options = {
      headers: new Headers({
        'Authorization': 'Token '+ token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };

    return this.http.post(url, body, options)
      .catch(this.handleError);
  }

  private handleError (error: Response) {
    return Observable.throw(error.json());
  }

}
