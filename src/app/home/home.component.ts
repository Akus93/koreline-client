import { Component, OnInit } from '@angular/core';

import {LessonService} from "../shared/services/lesson/lesson.service";
import {Lesson} from "../shared/models/lesson.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lessons: Lesson[];

  constructor(private lessonService: LessonService) { }

  ngOnInit() {
    this.lessonService.getLessons()
                      .subscribe(
                        lessons => this.lessons = lessons,
                        error => {}
                      );
  }

  private getTeacherFullName(lesson: Lesson): string {
      if (lesson.teacher.user.firstName && lesson.teacher.user.lastName)
        return lesson.teacher.user.firstName + ' ' + lesson.teacher.user.lastName;
      else
        return lesson.teacher.user.username;
    }

}
