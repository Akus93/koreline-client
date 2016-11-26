import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";


@Injectable()
export class StageService {

  private cachedStages: string[];

  constructor(private http: Http) { }


  getStages(): Observable<string[]> {

    if (this.cachedStages) {
      return Observable.of(this.cachedStages);
    } else {
      let url = 'http://localhost:8000/api/stages/';
      let options = {
        headers: new Headers({
          'Accept': 'application/json'
        })
      };

      return this.http.get(url, options)
        .map((response: Response) => response.json())
        .do(stages => this.cachedStages = stages)
        .catch(this.handleError);
    }

  }

  private handleError (error: Response) {
    return Observable.throw(error.json());
  }

}
