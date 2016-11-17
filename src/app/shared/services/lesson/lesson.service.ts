import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
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

    return this.http.get(url)
               .map((response: Response) => response.json())
               .catch(this.handleError)
  }

  getLesson(slug: string): Observable<Lesson> {

    let url = 'http://localhost:8000/api/lessons/' + slug;

    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(this.handleError)
  }

  private handleError (error: Response) {
    return Observable.throw(error.json());
  }

}
