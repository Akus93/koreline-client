import { Component, OnInit } from '@angular/core';
import {LessonService} from "../shared/services/lesson/lesson.service";
import {Lesson} from "../shared/models/lesson.model";
import {AuthService} from "../shared/services/auth/auth.service";

@Component({
  selector: 'app-my-lessons',
  templateUrl: './my-lessons.component.html',
  styleUrls: ['./my-lessons.component.css']
})
export class MyLessonsComponent implements OnInit {

  myLessons: Lesson[];

  constructor(private authService: AuthService, private lessonService: LessonService) { }

  ngOnInit() {
    this.getMyLessons();
  }

  getMyLessons(): void {
    this.lessonService.getCurrentUserLessons(this.authService.getToken())
      .subscribe(
        lessons => this.myLessons = lessons,
        error => {}
      );
  }

  leaveLesson(lesson: Lesson) {
    this.lessonService.leaveLesson(this.authService.getToken(), lesson.slug)
                      .subscribe(
                        response => this.getMyLessons(),
                        error => {},
                      )
  }

}
