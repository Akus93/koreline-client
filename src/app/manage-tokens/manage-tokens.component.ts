import { Component, OnInit } from '@angular/core';
import {ToastyService} from "ng2-toasty";
import {AuthService} from "../shared/services/auth/auth.service";
import {UserService} from "../shared/services/user/user.service";


@Component({
  selector: 'app-manage-tokens',
  templateUrl: './manage-tokens.component.html',
  styleUrls: ['./manage-tokens.component.css']
})
export class ManageTokensComponent implements OnInit {

  tokens: number;
  buyError: string;
  sellError: string;
  buyAmount: number;
  sellAmount: number;

  constructor(private authService: AuthService, private toastyService: ToastyService,
              private userService: UserService) { }

  ngOnInit() {
    this.sellAmount = 0;
    this.buyAmount = 0;
    this.userService.getCurrentUserProfile(this.authService.getToken())
      .subscribe(user => this.tokens = user.tokens);
  }

  onBuySubmit(): void {
    if(this.buyAmount < 1) {
      this.buyError = 'Liczba żetonów musi być większa od 0.';
      this.buyAmount = 0;
    } else if(typeof this.buyAmount != 'number') {
      this.buyError = 'Wartość nie jest liczbą!';
      this.buyAmount = 0;
    } else {
      this.userService.buyTokens(this.authService.getToken(), this.buyAmount)
        .subscribe(
          user => {
            this.tokens = user.tokens;
            this.toastyService.success({
              title: "Sukces",
              msg: "Zakupiono " + this.buyAmount.toString() + " żetonów",
              showClose: true,
              timeout: 7000,
              theme: 'default',
            });
            this.buyAmount = 0;
          },
          error => this.buyError = error.amount
        );
    }
  }

  onSellSubmit(): void {
    if (this.sellAmount < 1) {
      this.sellError = 'Liczba żetonów musi być większa od 0.';
      this.sellAmount = 0;
    } else if (typeof this.sellAmount != 'number') {
      this.sellError = 'Wartość nie jest liczbą!';
      this.sellAmount = 0;
    } else if (this.sellAmount > this.tokens) {
      this.sellError = 'Nie masz wystarczającej liczby żetonów.';
      this.sellAmount = 0;
    } else {
      this.userService.sellTokens(this.authService.getToken(), this.sellAmount)
        .subscribe(
          user => {
            this.tokens = user.tokens;
            this.toastyService.success({
              title: "Sukces",
              msg: "Sprzedano " + this.sellAmount.toString() + " żetonów",
              showClose: true,
              timeout: 7000,
              theme: 'default',
            });
            this.sellAmount = 0;
          },
          error => this.sellError = error.amount
        );
    }
  }

}
