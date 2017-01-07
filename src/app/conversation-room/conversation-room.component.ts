/// <reference path="../../typings/easyrtc.d.ts" />

import {Component, OnInit, ChangeDetectorRef, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import {Conversation} from "../shared/models/conversation.model";
import {AuthService} from "../shared/services/auth/auth.service";
import {Router} from "@angular/router";
import {ConversationService} from "../shared/services/conversation/conversation.service";
import {SharedService} from "../shared/services/shared/shared.service";
import {isNullOrUndefined} from "util";
import {ToastyService} from "ng2-toasty";


@Component({
  selector: 'app-conversation-room',
  templateUrl: './conversation-room.component.html',
  styleUrls: ['./conversation-room.component.css']
})
export class ConversationRoomComponent implements OnInit, OnDestroy {

  @ViewChild('chatContent') private chatContent: ElementRef;

  conversation: Conversation;
  myId: string;
  connectedClientsList:Array<string> = [];
  displayHangupBtn: boolean;
  cameraEnableBtn: boolean;
  audioEnableBtn: boolean;
  showConnectBtn: boolean;
  isTeacher: boolean;

  chat: string[];
  message: string;

  constructor(private router: Router, private cdr: ChangeDetectorRef, private sharedService: SharedService,
              private authService: AuthService, private conversationService: ConversationService,
              private toastyService: ToastyService) {}

  ngOnInit() {
    this.showConnectBtn = false;
    this.displayHangupBtn = false;
    this.cameraEnableBtn = false;
    this.audioEnableBtn = false;
    this.chat = Array<string>();
    this.isTeacher = false;

    this.sharedService.getCurrentConversation().subscribe(
      key => {
        if (key) {
          this.conversationService.getConversation(this.authService.getToken(), key)
            .subscribe(
              conversation => {
                this.conversation = conversation;
                if (conversation.lesson.teacher.user.username == this.authService.getUsername())
                  this.isTeacher = true;
                this.connect();
              },
              error => {
                this.toastyService.warning({
                  title: "",
                  msg: "Ta konwersacja już nie istnieje!",
                  showClose: true,
                  timeout: 7000,
                  theme: 'default',
                });
                this.router.navigate(['/'])
              }
            );
        } else {
          this.router.navigate(['/']);
        }
      },
      error => {
        this.router.navigate(['/'])
      }
    );
  }

  ngOnDestroy(): void {
    if (!isNullOrUndefined(this.conversation)) {
      this.conversationService.closeConversation(this.authService.getToken(), this.conversation.student.user.username)
        .subscribe();
      // easyrtc.leaveRoom(this.conversation.key, () => {
      // }, () => {
      // });
    }
    easyrtc.disconnect();
    //easyrtc.closeLocalStream('myVideo');
    easyrtc.setRoomOccupantListener( function(){});
  }

  hangup(): void {
    this.displayHangupBtn = false;
    this.showConnectBtn = true;
    this.cdr.detectChanges();
    easyrtc.hangupAll();
  }

  clearOccupant(): void {
    this.connectedClientsList = [];
    this.cdr.detectChanges();
  }

  performCall(clientEasyrtcId: string): void {
    easyrtc.hangupAll();
    let callSuccessCB = function(easyrtcid, mediaType):void {};
    let callFailureCB = function(errorCode, errMessage):void {};
    let wasAcceptedCB = function(wasAccepted, easyrtcid): void {
      if (wasAccepted) {
        this.displayHangupBtn = true;
        this.showConnectBtn = false;
        this.cdr.detectChanges();
      }
    };
    easyrtc.call(clientEasyrtcId, callSuccessCB, callFailureCB, wasAcceptedCB.bind(this), undefined);
  }

  setOccupant (roomName: string, data:Easyrtc_PerRoomData, isPrimary: boolean): void {
    this.clearOccupant();
    for(let easyrtcid in data) {
      this.connectedClientsList.push(easyrtc.idToName(easyrtcid));
      this.showConnectBtn = true;
    }
    this.cdr.detectChanges();
  }

  updateMyEasyRTCId(myEasyRTCId:string): void {
    this.myId = myEasyRTCId;
    this.cdr.detectChanges();
  }

  loginSuccess(easyrtcid:string): void {
    this.updateMyEasyRTCId(easyrtc.cleanId(easyrtcid));
  }

  loginFailure(errorCode:string, message:string): void {
    console.log('Login failed. Reason: '+ message);
  }

  enableCamera(): void {
    easyrtc.enableCamera(true, undefined);
    this.cameraEnableBtn = !this.cameraEnableBtn;
  }

  disableCamera(): void {
    easyrtc.enableCamera(false, undefined);
    this.cameraEnableBtn = !this.cameraEnableBtn;
  }

  enableMicrophone(): void {
    easyrtc.enableMicrophone(true, undefined);
    this.audioEnableBtn = !this.audioEnableBtn;
  }

  disableMicrophone(): void {
    easyrtc.enableMicrophone(false, undefined);
    this.audioEnableBtn = !this.audioEnableBtn;
  }

  connect():void {
    easyrtc.setSocketUrl("//localhost:8080", {'connect timeout': 10000,'force new connection': true });
    easyrtc.setVideoDims(320,240,undefined);

    easyrtc.setRoomEntryListener(function(entry, roomName){
             if( entry ){
                 console.log("Entering room " + roomName);
             }
             else{
                 console.log("Leaving room " + roomName);
             }
         });

    easyrtc.enableDataChannels(true);

    let peerListener = (easyrtcid, msgType, msgData, targeting): void => {
      this.chat.push(msgData.sender + ': ' + msgData.text);
      this.scrollToBottom();
      this.cdr.detectChanges();
    };
    easyrtc.setPeerListener(peerListener);

    easyrtc.setCredential({
      token: this.authService.getToken(),
      room: this.conversation.key
      });
    //easyrtc.setUsername(this.authService.getUsername());
    easyrtc.joinRoom(this.conversation.key, null, this.loginSuccess.bind(this), this.loginFailure.bind(this));

    let roomOccupantListener = (roomName: string, data: Easyrtc_PerRoomData, isPrimary: boolean): void => {
      this.setOccupant(roomName, data, isPrimary);
    };
    easyrtc.setRoomOccupantListener(roomOccupantListener);

    easyrtc.easyApp("koreline", "myVideo", ["callerVideo"], this.loginSuccess.bind(this), this.loginFailure.bind(this));

    let acceptChecker = (easyrtcid, acceptor): void => {
      this.showConnectBtn = false;
      this.displayHangupBtn = true;
      this.cdr.detectChanges();
      acceptor(true, undefined);
    };
    easyrtc.setAcceptChecker(acceptChecker);

    let disconnectListener = (): void => {
      this.toastyService.info({
        title: "",
        msg: "Opuszczono konwersację",
        showClose: true,
        timeout: 7000,
        theme: 'default',
      });
    };
    easyrtc.setDisconnectListener(disconnectListener);


    let serverListener = (msgType:string, msgData:any, targeting:Easyrtc_MessageTargeting) => {
      if (msgType == 'roomLeave') {
        if (this.isTeacher) {
          this.toastyService.info({
            title: "",
            msg: "Twój uczeń opuścił konwersację",
            showClose: true,
            timeout: 7000,
            theme: 'default',
          });
        }
        else {
          this.toastyService.info({
            title: "",
            msg: "Nauczyciel zamknął konwersajcę",
            showClose: true,
            timeout: 10000,
            theme: 'default',
          });
          this.router.navigate(['/']);
        }
      }
      // console.log("The Server sent the following message " + JSON.stringify(msgData));
    };
    easyrtc.setServerListener(serverListener)

  }

  scrollToBottom(): void{
    try {
      this.chatContent.nativeElement.scrollTop = this.chatContent.nativeElement.scrollHeight;
    } catch (error) {}
    this.cdr.detectChanges();
  }

  sendMessage() {
    let text = this.message;
    if (text) {
      if (this.connectedClientsList.length) {
        easyrtc.sendDataWS(this.connectedClientsList[0], 'message', {sender: this.authService.getUsername(), text: text}, (reply) => {
          if (reply.msgType === "error") {
            easyrtc.showError(reply.msgData.errorCode, reply.msgData.errorText);
          }
        });
        this.chat.push('Ja: ' + text);
        this.message = '';
        this.cdr.detectChanges();
        this.scrollToBottom();
      }
    }

  };

}
