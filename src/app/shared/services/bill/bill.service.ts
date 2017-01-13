import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {Bill} from "../../models/bill.model";
import {DOMAIN_NAME} from '../../global';

@Injectable()
export class BillService {

  constructor(private http: Http) { }

  createBill(token: string, lesson: string, student: string, amount: number): Observable<Bill> {

    let url = DOMAIN_NAME + '/api/teacher/bills/';
    let options = {
      headers: new Headers({
        'Authorization': 'Token '+ token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
    let body = JSON.stringify({ lesson: lesson, student: student, amount: amount });

    return this.http.post(url, body, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getTeacherBills(token: string): Observable<Bill[]> {

    let url = DOMAIN_NAME + '/api/teacher/bills/';
    let options = {
      headers: new Headers({
        'Authorization': 'Token '+ token,
        'Accept': 'application/json'
      })
    };

    return this.http.get(url, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getStudentBills(token: string): Observable<Bill[]> {

    let url = DOMAIN_NAME + '/api/user/bills/';
    let options = {
      headers: new Headers({
        'Authorization': 'Token '+ token,
        'Accept': 'application/json'
      })
    };

    return this.http.get(url, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  payBill(token: string, bill: number): Observable<Bill> {

    let url = DOMAIN_NAME + '/api/user/bills/';
    let options = {
      headers: new Headers({
        'Authorization': 'Token '+ token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
    let body = JSON.stringify({ bill: bill});

    return this.http.post(url, body, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  removeBill(token: string, bill: number): Observable<any> {

    let url = DOMAIN_NAME + '/api/teacher/bills/' + bill.toString() + '/';
    let options = {
      headers: new Headers({
        'Authorization': 'Token '+ token,
        'Accept': 'application/json'
      })
    };

    return this.http.delete(url, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  private handleError (error: Response) {
    return Observable.throw(error.json());
  }

}
