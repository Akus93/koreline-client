import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LessonService} from "../shared/services/lesson/lesson.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth/auth.service";
import {ToastyService} from "ng2-toasty";

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.css']
})
export class EditLessonComponent implements OnInit {

  editLessonForm: FormGroup;
  slug: string;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private lessonService: LessonService,
              private authService: AuthService, private router: Router, private toastyService: ToastyService) { }

  ngOnInit() {
    this.editLessonForm = this.formBuilder.group({
      title: ['', [Validators.maxLength(64)]],
      shortDescription: ['', [Validators.maxLength(255)]],
      longDescription: ['', [Validators.maxLength(2048)]]
    });

    let getLessonDetails$ = this.route.params.switchMap(params => this.lessonService.getLesson(params['slug']));
    getLessonDetails$.subscribe(
      lesson => {
        if (lesson.teacher.user.username == this.authService.getUsername()) {
          this.slug = lesson.slug;
          this.editLessonForm.patchValue(lesson);
        }
        else
          this.router.navigate(['/']);
      },
      error => this.showErrorsFromServer(error)
    );

  }

  public onSubmit() {
    for (let field in this.errorMessages)
      this.errorMessages[field]['errors'] = [];
    if (this.editLessonForm.valid) {
      let body = {
        title: this.editLessonForm.get('title').value,
        shortDescription: this.editLessonForm.get('shortDescription').value,
        longDescription: this.editLessonForm.get('longDescription').value,
      };
      this.lessonService.patchLesson(this.authService.getToken(), this.slug, body)
        .subscribe(
          lesson => {
            this.editLessonForm.patchValue(lesson);
            this.toastyService.success({
              title: "Sukces",
              msg: "Dane zostały zmienione",
              showClose: true,
              timeout: 7000,
              theme: 'default',
            });
          },
          error => this.showErrorsFromServer(error)
        );
    } else {
      for (let field in this.errorMessages) {
        this.errorMessages[field]['errors'] = [];
        let ctrl = this.editLessonForm.get(field);
        if (ctrl.invalid) {
          let messages = this.errorMessages[field]['messages'];
          for (let key in ctrl.errors) {
            this.errorMessages[field]['errors'].push(messages[key]);
          }
        }
      }
    }
  }

  private showErrorsFromServer(error: JSON) {
    for (let field in error)
      if (field in this.errorMessages)
        this.errorMessages[field]['errors'] = error[field];
  }

  errorMessages = {
    'title': {
      'messages': {
        'maxlength': 'To pole może zawierać maksymalnie 64 znaki.'
      },
      'errors': []
    },
    'shortDescription': {
      'messages': {
        'maxlength':  'To pole może zawierać maksymalnie 255 znaków.'
      },
      'errors': []
    },
    'longDescription': {
      'messages': {
        'maxlength':  'To pole może zawierać maksymalnie 2048 znaków.'
      },
      'errors': []
    }
  };

}
