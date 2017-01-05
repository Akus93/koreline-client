import { Injectable } from '@angular/core';
import {Observable} from "rxjs";


@Injectable()
export class SharedService {

  pusherChannel: any;
  currentConversation: string;
  messageReciver: string;
  activeMessageUser: string;
  usernameForComment: string;
  reportCommentID: number;

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

  getActiveMessageUser(): Observable<string> {
    return Observable.of(this.activeMessageUser);
  }

  setActiveMessageUser(value: string): void {
    this.activeMessageUser = value;
  }

  getUsernameForComment(): Observable<string> {
    return Observable.of(this.usernameForComment);
  }

  setUsernameForComment(value: string): void {
    this.usernameForComment = value;
  }

  getReportCommentID(): Observable<number> {
    return Observable.of(this.reportCommentID);
  }

  setReportCommentID(value: number): void {
    this.reportCommentID = value;
  }

}
