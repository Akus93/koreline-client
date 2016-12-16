import { Injectable } from '@angular/core';
import {Observable} from "rxjs";


@Injectable()
export class SharedService {

  pusherChannel: any;
  currentConversation: string;

  constructor() { }

  getCurrentConversation(): Observable<string> {
    return Observable.of(this.currentConversation);
  }

  setCurrentConversation(value: string): void {
    this.currentConversation = value;
  }

  getPusherChannel(): Observable<any> {
    return Observable.of(this.pusherChannel);
  }

  setPusherChannel(value: any): void {
    this.pusherChannel = value;
  }

}
