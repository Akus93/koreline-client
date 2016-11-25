import { Component, OnInit } from '@angular/core';

import {LessonService} from "../shared/services/lesson/lesson.service";
import {Lesson} from "../shared/models/lesson.model";
import {SubjectService} from "../shared/services/subject/subject.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lessons: Lesson[];
  subjects: string[];
  filter: {};
  minPrice: number;


  constructor(private lessonService: LessonService, private subjectService: SubjectService) {}

  ngOnInit() {
    this.filter = {};
    this.lessonService.getLessonsList({})
                      .subscribe(
                        lessons => this.lessons = lessons,
                        error => {}
                      );
    this.subjectService.getSubjects()
                       .subscribe(
                         subjects => this.subjects = subjects,
                         error => {}
                       );
  }

  private getTeacherFullName(lesson: Lesson): string {
      if (lesson.teacher.user.firstName && lesson.teacher.user.lastName)
        return lesson.teacher.user.firstName + ' ' + lesson.teacher.user.lastName;
      else
        return lesson.teacher.user.username;
    }

    filtration() {
    console.log(this.minPrice);
    }

    changeSubject(subject: string): void {
      let query = {};
      if (!(subject === 'null'))
        query['subject'] = subject;
      this.lessonService.getLessonsList(query)
        .subscribe(
          lessons => this.lessons = lessons,
          error => {}
        );
    }
}
