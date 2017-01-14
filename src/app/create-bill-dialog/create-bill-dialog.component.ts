import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-create-bill-dialog',
  templateUrl: './create-bill-dialog.component.html',
  styleUrls: ['./create-bill-dialog.component.css']
})
export class CreateBillDialogComponent implements OnInit {

  billAmount: number;
  error: string;

  constructor(public dialogRef: MdDialogRef<CreateBillDialogComponent>) { }

  ngOnInit() {
    this.billAmount = 0;
  }

  createBill() {
    if (this.billAmount < 1)
      this.error = 'Kwota nie może być mniejsza od 1.';
    else
      this.dialogRef.close(this.billAmount);
  }

}
