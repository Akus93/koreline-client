import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Lesson} from "../../models/lesson.model";

@Injectable()
export class LessonService {

  constructor(private http: Http ) { }

  getLessons(): Observable<Lesson[]> {

    let url = 'http://localhost:8000/api/lessons/';

    return this.http.get(url)
               .map((response: Response) => response.json())
               .catch(this.handleError)
  }

  private handleError (error: Response) {
    return Observable.throw(error.json());
  }

}
