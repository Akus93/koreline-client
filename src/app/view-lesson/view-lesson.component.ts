import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LessonService} from "../shared/services/lesson/lesson.service";
import {Lesson} from '../shared/models/lesson.model';

@Component({
  selector: 'app-view-lesson',
  templateUrl: './view-lesson.component.html',
  styleUrls: ['./view-lesson.component.css']
})
export class ViewLessonComponent implements OnInit {

  lesson: Lesson;

  constructor(private route: ActivatedRoute, private lessonService: LessonService) { }

  ngOnInit(): void {

    let getLessonDetails$ = this.route.params.switchMap(params => this.lessonService.getLesson(params['slug']));

    getLessonDetails$.subscribe(
      lesson => this.lesson = lesson,
      error => {}
    );
  }

}
