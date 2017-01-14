import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {DOMAIN_NAME} from '../../global';


@Injectable()
export class SubjectService {

  private cachedSubjects: string[];

  constructor(private http: Http) { }

  getSubjects(): Observable<string[]> {

    if (this.cachedSubjects) {
      return Observable.of(this.cachedSubjects);
    } else {
      let url = DOMAIN_NAME + '/api/subjects/';
      let options = {
        headers: new Headers({
          'Accept': 'application/json'
        })
      };

      return this.http.get(url, options)
        .map((response: Response) => response.json())
        .do(subjects => this.cachedSubjects = subjects)
        .catch(this.handleError);
    }
  }

  private handleError (error: Response) {
    return Observable.throw(error.json());
  }

}
