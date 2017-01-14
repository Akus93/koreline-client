import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/services/auth/auth.service";
import {BillService} from "../shared/services/bill/bill.service";
import {ToastyService} from "ng2-toasty";
import {Bill} from "../shared/models/bill.model";
import {UserProfile} from "../shared/models/userProfile.model";

@Component({
  selector: 'app-teacher-bills',
  templateUrl: './teacher-bills.component.html',
  styleUrls: ['./teacher-bills.component.css']
})
export class TeacherBillsComponent implements OnInit {

  bills: Bill[];

  constructor(private authService: AuthService, private billService: BillService, private toastyService: ToastyService) { }

  ngOnInit() {
    this.updateTeacherBills();
  }

  updateTeacherBills() {
    this.billService.getTeacherBills(this.authService.getToken())
      .subscribe(
        bills => this.bills = bills,
        error => {}
      );
  }

  deleteBill(bill: Bill) {
    this.billService.removeBill(this.authService.getToken(), bill.id)
      .subscribe(
        res => {
          this.updateTeacherBills();
          this.toastyService.success({
            title: "Sukces",
            msg: "Pomyślnie usunięto rachunek",
            showClose: true,
            timeout: 7000,
            theme: 'default',
          });
        },
        error => {
          this.toastyService.error({
            title: "Błąd",
            msg: 'Wystąpił błąd przy usuwaniu rachunku!',
            showClose: true,
            timeout: 7000,
            theme: 'default',
          });
        }
      );
  }

  public getFullNameOrUsername(user: UserProfile): string {
    if (user.user.firstName && user.user.lastName)
      return user.user.firstName + ' ' + user.user.lastName;
    else
      return user.user.username;
  }

}
