import {Component, OnInit} from '@angular/core';
import {AuthService} from './shared/services/auth/auth.service';
import {SharedService} from "./shared/services/shared/shared.service";
import {Notification} from "./shared/models/notification.model";
import {NotificationService} from "./shared/services/notification/notification.service";
import {Observable} from "rxjs";
import {MdDialog} from '@angular/material';
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  notifications: Notification[];

  constructor(private authService: AuthService, private sharedService: SharedService,
              private notificationService: NotificationService, private dialog: MdDialog) {}

  ngOnInit(): void {
    this.notifications = [];

    let notify$ = Observable.interval(30000).flatMap(() => {
        if (this.authService.isAuth())
          return this.notificationService.getNotifications(this.authService.getToken());
        else
          return Observable.of(null);
      });
    notify$.subscribe(
      notifications => this.notifications = notifications
    );
  }

  logout(): void {
    this.authService.logout();
    this.sharedService.getPusherChannel().subscribe(
      channel => {if(channel) channel.unbind_all()},
    );
  }

  openLoginDialog() {
    this.dialog.open(LoginComponent);
  }

  openRegistrationDialog() {
    this.dialog.open(RegistrationComponent);
  }

  markAsRead(notification: Notification) {
    this.notificationService.markAsRead(this.authService.getToken(), notification)
        .subscribe(
          notification => {
            let index = this.notifications.indexOf(notification);
            if (index > -1)
              this.notifications.splice(index, 1);
          },
          error => {}
        );
  }

  markAllAsRead() {
    let notifications = this.notifications.slice();
    for (let notification of notifications) {
      this.markAsRead(notification);
    }
  }

  timeAgo(date: string): string {
    let time = new Date(date);
    let now = new Date();
    let seconds = Math.floor((now.getTime() - time.getTime()) / 1000);
    let minutes = Math.floor(seconds/60);
    let hours = Math.floor(minutes/60);
    if (seconds < 60)
      return 'Niecałą minutę temu';
    else if (minutes > 1 && minutes < 2)
      return 'Około minuty temu';
    else if (minutes >= 2 && minutes < 10)
      return 'Parę minut temu';
    else if (minutes >= 10 && minutes < 60)
      return 'Kilkadziesiąt minut temu';
    else if (hours < 2)
      return 'Około godziny temu';
    else
      return 'Parę godzin temu';
  }

}
