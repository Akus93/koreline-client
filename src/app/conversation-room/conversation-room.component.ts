/// <reference path="../../typings/easyrtc.d.ts" />

import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Conversation} from "../shared/models/conversation.model";
import {AuthService} from "../shared/services/auth/auth.service";

@Component({
  selector: 'app-conversation-room',
  templateUrl: './conversation-room.component.html',
  styleUrls: ['./conversation-room.component.css']
})
export class ConversationRoomComponent implements OnInit {

  activeconversation: Conversation;

  token: string;
  username: string;

  constructor(private cdr: ChangeDetectorRef, private authService: AuthService) {
    this.token = this.authService.getToken();
    this.username = this.authService.getUsername();
  }

  ngOnInit() {
  }

  myId:string = '';
  connectedClientsList:Array<string> = [];

  clearConnectList():void {
    this.connectedClientsList = [];
    this.cdr.detectChanges();
  }

  performCall(clientEasyrtcId:string):void {
    let successCB = function(a:string, b:string):void {};
    let failureCB = function(a:string, b:string):void {};
    easyrtc.call(clientEasyrtcId, successCB, failureCB, undefined, undefined);
  }

  buildCaller(easyrtcid:string):(()=>void) {
    return ():void => {
      this.performCall(easyrtcid);
    };
  }

  convertListToButtons (roomName:string, data:Easyrtc_PerRoomData, isPrimary:boolean):void {
    this.clearConnectList();
    for(let easyrtcid in data) {
      this.connectedClientsList.push(easyrtc.idToName(easyrtcid));
    }
    this.cdr.detectChanges();
  }

  updateMyEasyRTCId(myEasyRTCId:string):void {
    this.myId = myEasyRTCId;
    this.cdr.detectChanges();
  }

  loginSuccess(easyrtcid:string):void {
    this.updateMyEasyRTCId(easyrtc.cleanId(easyrtcid));
  }

  loginFailure(errorCode:string, message:string):void {
    this.updateMyEasyRTCId('Login failed. Reason: '+ message);
  }

  connect():void {
    easyrtc.setSocketUrl("//localhost:8080", {'connect timeout': 10000,'force new connection': true });
    easyrtc.setVideoDims(320,240,undefined);
    easyrtc.enableDataChannels(true);

    easyrtc.setCredential({token: '12345'});
    //easyrtc.setUsername('Akus');

    let convertListToButtonShim = (roomName:string, data:Easyrtc_PerRoomData, isPrimary:boolean):void => {
      this.convertListToButtons(roomName, data, isPrimary);
    };
    easyrtc.setRoomOccupantListener(convertListToButtonShim);
    easyrtc.easyApp("easyrtc.audioVideoSimple", "videoSelf", ["videoCaller"], this.loginSuccess.bind(this), this.loginFailure.bind(this));
  }

  ngAfterViewInit() {
    this.connect();
  }
}
