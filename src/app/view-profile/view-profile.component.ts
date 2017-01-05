import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../shared/services/user/user.service";
import {UserProfile} from "../shared/models/userProfile.model";
import {LessonService} from "../shared/services/lesson/lesson.service";
import {Lesson} from "../shared/models/lesson.model";
import {isUndefined} from "util";
import {AuthService} from "../shared/services/auth/auth.service";
import {SendMessageDialogComponent} from "../send-message-dialog/send-message-dialog.component";
import {MdDialog} from "@angular/material";
import {SharedService} from "../shared/services/shared/shared.service";
import {Comment} from "../shared/models/comment.model";
import {WriteCommentDialogComponent} from "../write-comment-dialog/write-comment-dialog.component";
import {CommentService} from "../shared/services/comment/comment.service";
import {DOMAIN_NAME} from '../shared/global';
import {ReportCommentDialogComponent} from "../report-comment-dialog/report-comment-dialog.component";

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  domain: string;
  user: UserProfile;
  userLessons: Lesson[];
  comments: Comment[];

  constructor(private route: ActivatedRoute, private userService: UserService, private lessonService: LessonService,
              public authService: AuthService, public dialog: MdDialog, private sharedService: SharedService, private commentService: CommentService) {
    this.domain = DOMAIN_NAME;
  }

  ngOnInit() {

    let getProfileByUsername$ = this.route.params.switchMap(params => this.userService.getUserProfile(params['username']));

    getProfileByUsername$.subscribe(
      user => {
        this.user = user;
        this.lessonService.getLessonsList({teacher: user.user.username}).subscribe(
          lessons => this.userLessons = lessons,
          error => {}
        );
        this.getComments();
      },
      error => {}
    );

  }

  getComments() {
    this.commentService.getTeacherComments(this.user.user.username).subscribe(
      comments => this.comments = comments,
      error => {}
    )
  }

  public getFullNameOrUsername(user: UserProfile): string {
    if (isUndefined(user))
      return '';
    if (user.user.firstName && user.user.lastName)
      return user.user.firstName + ' ' + user.user.lastName;
    else
      return user.user.username;
  }

  sendMessage(reciver: UserProfile) {
    this.sharedService.setMessageReciver(reciver.user.username);
    let dialogRef = this.dialog.open(SendMessageDialogComponent);
  }

  writeComment() {
    this.sharedService.setUsernameForComment(this.user.user.username);
    let dialogRef = this.dialog.open(WriteCommentDialogComponent);
    dialogRef.afterClosed().subscribe(
      success => {
        if (success)
          this.getComments();
      }
    );
  }

  reportComment(id: number) {
    this.sharedService.setReportCommentID(id);
    let dialogRef = this.dialog.open(ReportCommentDialogComponent);
  }

  buildRate(rate: number): Array<string> {
    let rating: Array<string> = [];
    for (let i = 0; i < rate; ++i) {
      rating.push('star');
    }
    for (let i = rating.length; i < 5; ++i ) {
      rating.push('star_border');
    }
    return rating;
  }

}
