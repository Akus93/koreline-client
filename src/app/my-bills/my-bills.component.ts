import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/services/auth/auth.service";
import {BillService} from "../shared/services/bill/bill.service";
import {Bill} from "../shared/models/bill.model";
import {ToastyService} from "ng2-toasty";
import {UserProfile} from "../shared/models/userProfile.model";
import {SendMessageDialogComponent} from "../send-message-dialog/send-message-dialog.component";
import {MdDialog} from "@angular/material";
import {SharedService} from "../shared/services/shared/shared.service";

@Component({
  selector: 'app-my-bills',
  templateUrl: './my-bills.component.html',
  styleUrls: ['./my-bills.component.css']
})
export class MyBillsComponent implements OnInit {

  myBills: Bill[];

  constructor(private authService: AuthService, private billService: BillService, private toastyService: ToastyService,
              public dialog: MdDialog, private sharedService: SharedService) { }

  ngOnInit() {
    this.updateBills();
  }

  updateBills() {
    this.billService.getStudentBills(this.authService.getToken())
      .subscribe(
        bills => this.myBills = bills,
        error => {}
      );
  }

  payBill(bill: Bill) {
    this.billService.payBill(this.authService.getToken(), bill.id)
      .subscribe(
        bill => {
          this.updateBills();
          this.toastyService.success({
            title: "Sukces",
            msg: "Pomyślnie opłacono rachunek",
            showClose: true,
            timeout: 7000,
            theme: 'default',
          });
        },
        error => {
          this.toastyService.error({
            title: "Błąd",
            msg: error.error,
            showClose: true,
            timeout: 7000,
            theme: 'default',
          });
        }
      );
  }

  sendMessage(reciver: UserProfile) {
    this.sharedService.setMessageReciver(reciver.user.username);
    let dialogRef = this.dialog.open(SendMessageDialogComponent);
  }

  public getFullNameOrUsername(user: UserProfile): string {
    if (user.user.firstName && user.user.lastName)
      return user.user.firstName + ' ' + user.user.lastName;
    else
      return user.user.username;
  }

}
