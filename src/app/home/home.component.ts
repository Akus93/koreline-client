import { Component, OnInit } from '@angular/core';

import {LessonService} from "../shared/services/lesson/lesson.service";
import {Lesson} from "../shared/models/lesson.model";
import {SubjectService} from "../shared/services/subject/subject.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {StageService} from "../shared/services/stage/stage.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  lessons: Lesson[];
  subjects: string[];
  stages: string[];
  filterForm: FormGroup;

  constructor(private lessonService: LessonService, private subjectService: SubjectService,
              private formBuilder: FormBuilder, private stageService: StageService) {}

  ngOnInit() {
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
    this.stageService.getStages()
                     .subscribe(
                       stages => this.stages = stages,
                       error => {}
                     );
    this.filterForm = this.formBuilder.group({
      subject: [''],
      stage: [''],
      maxPrice: [''],
      minPrice: ['']
    });
  }

  private getTeacherFullName(lesson: Lesson): string {
      if (lesson.teacher.user.firstName && lesson.teacher.user.lastName)
        return lesson.teacher.user.firstName + ' ' + lesson.teacher.user.lastName;
      else
        return lesson.teacher.user.username;
  }

  filtration() {
    if (this.filterForm.valid) {
    let query = {};
    for (let control in this.filterForm.controls) {
      let ctrl = this.filterForm.get(control.toString());
      if (ctrl.value)
        query[control.toString()] = ctrl.value;
    }
      this.lessonService.getLessonsList(query)
        .subscribe(
          lessons => this.lessons = lessons,
          error => {}
        );
    } else {
      console.log('Błąd filtrowania...');
    }
  }

  resetFiltration() {
    this.filterForm.reset();
    this.lessonService.getLessonsList({})
      .subscribe(
        lessons => this.lessons = lessons,
        error => {}
      );
  }

}
