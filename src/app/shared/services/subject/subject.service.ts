import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {error} from "util";


@Injectable()
export class SubjectService {

  constructor(private http: Http) { }


  getSubjects(): Observable<Array<string>> {

    let url = 'http://localhost:8000/api/subjects/';

    return this.http.get(url)
                    .map((response: Response) => response.json())
                    .catch(this.handleError);
  }

  private handleError (error: Response) {
    return Observable.throw(error.json());
  }

}
