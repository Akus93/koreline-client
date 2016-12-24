import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../shared/services/user/user.service";
import {UserProfile} from "../shared/models/userProfile.model";
import {LessonService} from "../shared/services/lesson/lesson.service";
import {Lesson} from "../shared/models/lesson.model";
import {isUndefined} from "util";

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  user: UserProfile;
  userLessons: Lesson[];

  constructor(private route: ActivatedRoute, private userService: UserService, private lessonService: LessonService) {}

  ngOnInit() {

    let getProfileByUsername$ = this.route.params.switchMap(params => this.userService.getUserProfile(params['username']));

    getProfileByUsername$.subscribe(
      user => {
        this.user = user;
        this.lessonService.getLessonsList({teacher: user.user.username}).subscribe(
          lessons => this.userLessons = lessons,
          error => {}
        );
      },
      error => {}
    );
  }

  public getFullNameOrUsername(user?: UserProfile): string {
    if (isUndefined(user))
      return '';
    if (user.user.firstName && user.user.lastName)
      return user.user.firstName + ' ' + user.user.lastName;
    else
      return user.user.username;
  }

}
