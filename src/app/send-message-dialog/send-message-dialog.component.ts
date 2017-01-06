import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from "@angular/material";
import {SharedService} from "../shared/services/shared/shared.service";
import {MessageService} from "../shared/services/message/message.service";
import {AuthService} from "../shared/services/auth/auth.service";
import {ToastyService} from "ng2-toasty";

@Component({
  selector: 'app-send-message-dialog',
  templateUrl: './send-message-dialog.component.html',
  styleUrls: ['./send-message-dialog.component.css']
})
export class SendMessageDialogComponent implements OnInit {

  error: string;

  constructor(public dialogRef: MdDialogRef<SendMessageDialogComponent>, private sharedService: SharedService,
              private messageService: MessageService, private authService: AuthService,
              private toastyService: ToastyService) { }

  ngOnInit() {
  }

  sendMessage(title: string, text: string) {
    this.error = '';
    if (text.length == 0)
      this.error = 'Treść wiadomości nie może być pusta.';
    else if (title.length == 0)
      this.error = 'Tytuł wiadomości nie moze być pusty.';
    else {
      this.sharedService.getMessageReciver()
          .subscribe(
            reciver => this.messageService.sendMessage(this.authService.getToken(), reciver, title, text)
              .subscribe(
                message => {
                  this.toastyService.success({
                    title: "Sukces",
                    msg: "Wiadomość została wysłana",
                    showClose: true,
                    timeout: 7000,
                    theme: 'default',
                  });
                  this.dialogRef.close(true);
                },
                error => this.error = error.text || error.reciver || error.title
              ),
            error => {}
          );
    }
  }

}
