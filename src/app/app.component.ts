import {Component, OnInit} from '@angular/core';
import {AuthService} from './shared/services/auth/auth.service';
import {SharedService} from "./shared/services/shared/shared.service";
import {Notification} from "./shared/models/notification.model";
import {NotificationService} from "./shared/services/notification/notification.service";
import {Observable} from "rxjs";
import {MdDialog} from '@angular/material';
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {Message} from "./shared/models/message.model";
import {MessageService} from "./shared/services/message/message.service";
import {UserProfile} from "./shared/models/userProfile.model";
import {isUndefined} from "util";
import {Router} from "@angular/router";
import {EventsService} from "./shared/services/events/events.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  notifications: Notification[];
  unreadMessages: Message[];

  constructor(private authService: AuthService, private sharedService: SharedService,
              private notificationService: NotificationService, private messageService: MessageService,
              private dialog: MdDialog, private router: Router, private eventService: EventsService) {
    this.notifications = Array<Notification>();
    this.unreadMessages = Array<Message>();
  }

  ngOnInit(): void {
    this.eventService.onLoggedIn$.subscribe(isLoggedIn => this.onLoggedIn());
    let notify$ = Observable.interval(30000).flatMap(() => {
        if (this.authService.isAuth())
          return this.notificationService.getNotifications(this.authService.getToken());
        else
          return Observable.of(null);
      });
    notify$.subscribe(
      notifications => this.notifications = notifications
    );

    let messages$ = Observable.interval(20000).flatMap(() => {
      if (this.authService.isAuth())
        return this.messageService.getUnreadMessages(this.authService.getToken());
      else
        return Observable.of(null);
    });
    messages$.subscribe(
      messages => this.unreadMessages = messages
    );

  }

  onLoggedIn() {
    this.notificationService.getNotifications(this.authService.getToken())
        .subscribe(notifications => this.notifications = notifications);
    this.messageService.getUnreadMessages(this.authService.getToken())
        .subscribe(messages => this.unreadMessages = messages);
  }

  notificationAction(notification: Notification): void {
    this.markNotificationAsRead(notification);
    switch (notification.type) {
      case 'INVITE':
        this.sharedService.setCurrentConversation(notification.data);
        this.router.navigate(['/conversation']);
        break;
      case 'TEACHER_UNSUBSCRIBE':
        this.router.navigate(['/teacher/my-lessons']);
        break;
      case 'STUDENT_UNSUBSCRIBE':
        this.router.navigate(['/user/my-lessons']);
        break;
      case 'SUBSCRIBE':
        this.router.navigate(['/teacher/my-lessons']);
        break;
      default:
        break;
    }
  }

  logout(): void {
    this.authService.logout();
    this.sharedService.getPusherChannel().subscribe(
      channel => {if(channel) channel.unbind_all()},
    );
    // this.sharedService.getPusherChannel().disconnect();
  }

  openLoginDialog() {
    this.dialog.open(LoginComponent);
  }

  openRegistrationDialog() {
    this.dialog.open(RegistrationComponent);
  }

  markNotificationAsRead(notification: Notification) {
    this.notificationService.markAsRead(this.authService.getToken(), notification)
        .subscribe(
          response => {
            let index = this.notifications.indexOf(notification);
            if (index > -1)
              this.notifications.splice(index, 1);
          },
          error => {}
        );
  }

  markAllNotificationsAsRead() {
    let notifications = this.notifications.slice();
    for (let notification of notifications) {
      this.markNotificationAsRead(notification);
    }
  }

  markMessageAsRead(message: Message) {
    this.messageService.markAsRead(this.authService.getToken(), message)
      .subscribe(
        response => {
          let index = this.unreadMessages.indexOf(message);
          if (index > -1)
            this.unreadMessages.splice(index, 1);
        },
        error => {}
      );
  }

  markAllMessagesAsRead() {
    let messages = this.unreadMessages.slice();
    for (let message of messages) {
      this.markMessageAsRead(message);
    }
  }

  public getFullNameOrUsername(user?: UserProfile): string {
    if (isUndefined(user))
      return '';
    if (user.user.firstName && user.user.lastName)
      return user.user.firstName + ' ' + user.user.lastName;
    else
      return user.user.username;
  }

  showMessage(message: Message) {
    this.markMessageAsRead(message);
    this.sharedService.setActiveMessageUser(message.sender.user.username);
    this.router.navigate(['/messages']);
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
