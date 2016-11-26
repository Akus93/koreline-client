import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LessonService} from "../shared/services/lesson/lesson.service";
import {Lesson} from '../shared/models/lesson.model';
import {AuthService} from "../shared/services/auth/auth.service";
import {ToastyService} from "ng2-toasty";

@Component({
  selector: 'app-view-lesson',
  templateUrl: './view-lesson.component.html',
  styleUrls: ['./view-lesson.component.css']
})
export class ViewLessonComponent implements OnInit {

  lesson: Lesson;

  constructor(private route: ActivatedRoute, private lessonService: LessonService, private authService: AuthService,
              private toastyService: ToastyService ) { }

  ngOnInit(): void {

    let getLessonDetails$ = this.route.params.switchMap(params => this.lessonService.getLesson(params['slug']));

    getLessonDetails$.subscribe(
      lesson => this.lesson = lesson,
      error => {}
    );
  }

  joinLesson() {
    this.lessonService.joinLesson(this.authService.getToken(), this.lesson.slug)
                      .subscribe(
                        response => this.toastyService.success({
                          title: "Sukces",
                          msg: "Zostałeś zapisany/a do tej lekcji",
                          showClose: true,
                          timeout: 7000,
                          theme: 'default',
                        }),
                        error => this.toastyService.warning({
                          title: "Uwaga",
                          msg: "Już jesteś zapisany/a do tej lekcji",
                          showClose: true,
                          timeout: 7000,
                          theme: 'default',
                        })
                      );
  }

}
