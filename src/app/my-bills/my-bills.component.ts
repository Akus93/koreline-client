import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/services/auth/auth.service";
import {BillService} from "../shared/services/bill/bill.service";
import {Bill} from "../shared/models/bill.model";
import {ToastyService} from "ng2-toasty";

@Component({
  selector: 'app-my-bills',
  templateUrl: './my-bills.component.html',
  styleUrls: ['./my-bills.component.css']
})
export class MyBillsComponent implements OnInit {

  myBills: Bill[];

  constructor(private authService: AuthService, private billService: BillService, private toastyService: ToastyService) { }

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

}
