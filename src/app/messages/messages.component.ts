import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/services/auth/auth.service";
import {MessageService} from "../shared/services/message/message.service";
import {isUndefined} from "util";
import {UserProfile} from "../shared/models/userProfile.model";
import {DOMAIN_NAME} from '../shared/global';
import {Message} from "../shared/models/message.model";
import {SharedService} from "../shared/services/shared/shared.service";
import {MdDialog} from "@angular/material";
import {SendMessageDialogComponent} from "../send-message-dialog/send-message-dialog.component";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  interlocutors: UserProfile[];
  domain: string;
  activeUser: string;
  activeUserMessages: Message[];

  constructor(private authService: AuthService, private messageService: MessageService, public dialog: MdDialog,
              private sharedService: SharedService) {
    this.domain = DOMAIN_NAME;
  }

  ngOnInit() {
    this.messageService.getInterlocutors(this.authService.getToken())
        .subscribe(
          interlocutors => this.interlocutors = interlocutors,
          error => {}
        );
    this.sharedService.getActiveMessageUser()
        .subscribe(
          username => {
            if (username)
              this.changeActiveUser(username);
            this.sharedService.setActiveMessageUser('');
          }
        );
  }

  public changeActiveUser(username: string): void {
    this.activeUser = username;
    this.messageService.getMessagesWithUser(this.authService.getToken(), username)
        .subscribe(
          messages => this.activeUserMessages = messages
        );
  }

  public getFullNameOrUsername(user: UserProfile): string {
    if (isUndefined(user))
      return '';
    if (user.user.firstName && user.user.lastName)
      return user.user.firstName + ' ' + user.user.lastName;
    else
      return user.user.username;
  }

  sendMessage() {
    this.sharedService.setMessageReciver(this.activeUser);
    let dialogRef = this.dialog.open(SendMessageDialogComponent);
    dialogRef.afterClosed().subscribe(
      result => {
        if (result)
          this.messageService.getMessagesWithUser(this.authService.getToken(), this.activeUser)
            .subscribe(
              messages => this.activeUserMessages = messages
            );
      }
    );
  }

}
