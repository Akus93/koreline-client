import { Component, OnInit } from '@angular/core';
import {Lesson} from "../shared/models/lesson.model";
import {LessonService} from "../shared/services/lesson/lesson.service";
import {AuthService} from "../shared/services/auth/auth.service";
import {ToastyService} from "ng2-toasty";
import {ConversationService} from "../shared/services/conversation/conversation.service";
import {Conversation} from "../shared/models/conversation.model";
import {Router} from "@angular/router";
import {SharedService} from "../shared/services/shared/shared.service";
import {isUndefined} from "util";
import {UserProfile} from "../shared/models/userProfile.model";
import {DOMAIN_NAME} from '../shared/global';
import {SendMessageDialogComponent} from "../send-message-dialog/send-message-dialog.component";
import {MdDialog} from "@angular/material";

@Component({
  selector: 'app-teacher-lessons',
  templateUrl: './teacher-lessons.component.html',
  styleUrls: ['./teacher-lessons.component.css']
})
export class TeacherLessonsComponent implements OnInit {

  lessons: Lesson[];
  domain: string;

  constructor(private router: Router, private authService: AuthService, private lessonService: LessonService,
              private conversationService: ConversationService, private toastyService: ToastyService,
              private sharedService: SharedService, public dialog: MdDialog) { }

  ngOnInit() {
    this.domain = DOMAIN_NAME;
    this.getMyLessons();
  }

  getMyLessons() {
    this.lessonService.getLessonsList({teacher: this.authService.getUsername()})
      .subscribe(
        lessons => {
          this.lessons = lessons;
          for (let lesson of lessons) {
            this.lessonService.getLessonMembers(this.authService.getToken(), lesson.slug)
                              .subscribe(
                                students => lesson.students = students,
                                error => {}
                              );
          }
        },
            error => {}
      );
  }

  deleteLesson(lesson: Lesson): void {
    this.lessonService.deleteLesson(this.authService.getToken(), lesson.slug)
                      .subscribe(
                        response => {
                          this.getMyLessons();
                          this.toastyService.success({
                            title: "Sukces",
                            msg: "Pomyślnie wypisałeś/aś się z lekcji",
                            showClose: true,
                            timeout: 7000,
                            theme: 'default',
                          });
                        },
                        error => {}
                      );
  }

  unsubscribeStudent(lesson, student) {
    this.lessonService.unsubscribeStudent(this.authService.getToken(), lesson.slug, student.user.username)
                      .subscribe(
                        response => {
                          this.getMyLessons();
                          this.toastyService.success({
                            title: "Sukces",
                            msg: "Pomyślnie wypisano ucznia " + student.user.username +" z lekcji",
                            showClose: true,
                            timeout: 7000,
                            theme: 'default',
                          });
                        },
                        error => {},
                      );

  }

  createConversation(lesson, student) {
    this.conversationService.createConversation(this.authService.getToken(), lesson.slug, student.user.username)
        .subscribe(
          conversation => {
            this.sharedService.setCurrentConversation(conversation.key);
            this.router.navigate(['/conversation']);
          },
          error => {}
        );
  }

  public getFullNameOrUsername(student?: UserProfile): string {
    if (isUndefined(student))
      return '';
    if (student.user.firstName && student.user.lastName)
      return student.user.firstName + ' ' + student.user.lastName;
    else
      return student.user.username;
  }

  sendMessage(reciver: UserProfile) {
    this.sharedService.setMessageReciver(reciver.user.username);
    let dialogRef = this.dialog.open(SendMessageDialogComponent);
  }

}
