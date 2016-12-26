import { Injectable } from '@angular/core';
import {Observable} from "rxjs";


@Injectable()
export class SharedService {

  pusherChannel: any;
  currentConversation: string;
  messageReciver: string;

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

  getMessageReciver(): Observable<string> {
    return Observable.of(this.messageReciver);
  }

  setMessageReciver(value: string): void {
    this.messageReciver = value;
  }

}
