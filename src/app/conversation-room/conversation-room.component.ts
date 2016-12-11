/// <reference path="../../typings/easyrtc.d.ts" />

import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Conversation} from "../shared/models/conversation.model";
import {AuthService} from "../shared/services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConversationService} from "../shared/services/conversation/conversation.service";


@Component({
  selector: 'app-conversation-room',
  templateUrl: './conversation-room.component.html',
  styleUrls: ['./conversation-room.component.css']
})
export class ConversationRoomComponent implements OnInit {

  conversation: Conversation;

  constructor(private route: ActivatedRoute, private router: Router, private cdr: ChangeDetectorRef,
              private authService: AuthService, private conversationService: ConversationService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.conversationService.getConversation(this.authService.getToken(), params['room'])
          .subscribe(
            conversation => {
                this.conversation = conversation;
                this.connect();
            },
            error => this.router.navigate(['/'])
          );
    });
  }

  myId:string = '';
  connectedClientsList:Array<string> = [];

  clearConnectList():void {
    this.connectedClientsList = [];
    this.cdr.detectChanges();
  }

  performCall(clientEasyrtcId:string):void {
    let successCB = function(a: string, b: string):void {};
    let failureCB = function(a: string, b: string):void {};
    easyrtc.call(clientEasyrtcId, successCB, failureCB, undefined, undefined);
  }

  buildCaller(easyrtcid:string):(()=>void) {
    return ():void => {
      this.performCall(easyrtcid);
    };
  }

  convertListToButtons (roomName:string, data:Easyrtc_PerRoomData, isPrimary:boolean):void {
    console.log('Polaczono z pokojem: '+roomName);
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

    //easyrtc.enableDataChannels(true);

    easyrtc.setCredential({token: this.authService.getToken()});
    //easyrtc.setUsername(this.authService.getUsername());
    console.log('Lącze sie z pokojem: '+ this.conversation.key);
    easyrtc.joinRoom(this.conversation.key, null, this.loginSuccess.bind(this), this.loginFailure.bind(this));

    let convertListToButtonShim = (roomName:string, data:Easyrtc_PerRoomData, isPrimary:boolean):void => {
      this.convertListToButtons(roomName, data, isPrimary);
    };
    easyrtc.setRoomOccupantListener(convertListToButtonShim);
    easyrtc.easyApp("koreline.AudioVideo", "videoSelf", ["videoCaller"], this.loginSuccess.bind(this), this.loginFailure.bind(this));
  }

  // ngAfterContentChecked() {
  //   this.connect();
  // }
}
