import { Component, OnInit } from '@angular/core';
import {LessonService} from "../shared/services/lesson/lesson.service";
import {Lesson} from "../shared/models/lesson.model";
import {AuthService} from "../shared/services/auth/auth.service";
import {ToastyService} from "ng2-toasty";
import {MdDialog} from "@angular/material";
import {SendMessageDialogComponent} from "../send-message-dialog/send-message-dialog.component";
import {SharedService} from "../shared/services/shared/shared.service";
import {UserProfile} from "../shared/models/userProfile.model";
import {ConversationService} from "../shared/services/conversation/conversation.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-lessons',
  templateUrl: './my-lessons.component.html',
  styleUrls: ['./my-lessons.component.css']
})
export class MyLessonsComponent implements OnInit {

  myLessons: Lesson[];

  constructor(private authService: AuthService, private lessonService: LessonService,
              private conversationService: ConversationService, private toastyService: ToastyService,
              public dialog: MdDialog, private sharedService: SharedService, private router: Router) { }

  ngOnInit() {
    this.getMyLessons();
  }

  getMyLessons(): void {
    this.lessonService.getCurrentUserLessons(this.authService.getToken())
      .subscribe(
        lessons => {
          this.myLessons = lessons;
          for (let lesson of this.myLessons)
            this.getConversationForLesson(lesson)
        },
        error => {}
      );
  }

  leaveLesson(lesson: Lesson) {
    this.lessonService.leaveLesson(this.authService.getToken(), lesson.slug)
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
                      )
  }

  getConversationForLesson(lesson: Lesson) {
    this.conversationService.getConversationForLesson(this.authService.getToken(), lesson.slug)
        .subscribe(
          conversation => {
            let index = this.myLessons.indexOf(lesson);
            if (index > -1)
              this.myLessons[index].conversation = conversation;
          },
          error => {}
        )
  }

  sendMessage(reciver: UserProfile) {
    this.sharedService.setMessageReciver(reciver.user.username);
    let dialogRef = this.dialog.open(SendMessageDialogComponent);
  }

  enterToConversation(lesson: Lesson): void {
    this.sharedService.setCurrentConversation(lesson.conversation.key);
    this.router.navigate(['/conversation']);
  }

}
