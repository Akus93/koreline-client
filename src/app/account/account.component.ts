import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/services/auth/auth.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  activeComponent: string;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.activeComponent = 'info';
  }

  changeComponent(name: string) {
    this.activeComponent = name;
  }

}
