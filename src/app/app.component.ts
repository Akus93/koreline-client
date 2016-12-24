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

  timeAgo(date: string): string {
    let time = new Date(date);
    let seconds = Math.floor((new Date().getDate() - time.getDate()) / 1000);
    let minutes = Math.floor(seconds/60);
    let hours = Math.floor(minutes/60);
    if (seconds < 60)
      return 'Kilka sekund temu';
    else if (minutes < 60)
      return 'Kilka minut temu';
    else if (hours < 2)
      return 'Około godziny temu';
    else
      return 'Parę godzin temu';

  }

}
