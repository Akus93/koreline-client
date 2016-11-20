import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";


@Injectable()
export class SubjectService {

  constructor(private http: Http) { }


  getSubjects(): Observable<Array<string>> {

    let url = 'http://localhost:8000/api/subjects/';
    let options = {
      headers: new Headers({
        'Accept': 'application/json'
      })
    };

    return this.http.get(url, options)
                    .map((response: Response) => response.json())
                    .catch(this.handleError);
  }

  private handleError (error: Response) {
    return Observable.throw(error.json());
  }

}
