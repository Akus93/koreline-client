import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LessonService} from "../shared/services/lesson/lesson.service";
import {SubjectService} from "../shared/services/subject/subject.service";
import {AuthService} from "../shared/services/auth/auth.service";
import {StageService} from "../shared/services/stage/stage.service";

@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.css']
})
export class CreateLessonComponent implements OnInit {

  lessonCreateForm: FormGroup;
  subjects: string[];
  stages: string[];

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder,
              private lessonService: LessonService, private subjectService: SubjectService, private stageService: StageService) { }

  ngOnInit() {
    this.stageService.getStages().subscribe(
      stages => this.stages = stages,
      error => {}
    );
    this.subjectService.getSubjects().subscribe(
      subjects => this.subjects = subjects,
      error => {}
    );
    this.lessonCreateForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      stage: ['', [Validators.required]],
      price: ['', [Validators.required]],
      shortDescription: ['', [Validators.required, Validators.maxLength(255)]],
      longDescription: ['', [Validators.required, Validators.maxLength(2048)]]
    });

  }

  onSubmit(): void {
    console.log(this.lessonCreateForm.controls);
    if (this.lessonCreateForm.valid) {
      this.lessonService.createLesson(
        this.authService.getToken(),
        this.lessonCreateForm.get('title').value,
        this.lessonCreateForm.get('subject').value,
        this.lessonCreateForm.get('stage').value,
        this.lessonCreateForm.get('price').value,
        this.lessonCreateForm.get('shortDescription').value,
        this.lessonCreateForm.get('longDescription').value
      ).subscribe(
          lesson => {
            localStorage.setItem('isTeacher', true.toString());
            this.router.navigate(['/lesson', lesson.slug]);
          },
          error => this.showErrorsFromServer(error)
        );
    }
    else
      for (let field in this.errorMessages) {
        this.errorMessages[field]['errors'] = [];
        let ctrl = this.lessonCreateForm.get(field);
        if (ctrl.invalid) {
          let messages = this.errorMessages[field]['messages'];
          for (let key in ctrl.errors) {
            this.errorMessages[field]['errors'].push(messages[key]);
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
        'required': 'To pole jest wymagane.'
      },
      'errors': []
    },
    'subject': {
      'messages': {
        'required':   'To pole jest wymagane.',
      },
      'errors': []
    },
    'stage': {
      'messages': {
        'required':   'To pole jest wymagane.',
      },
      'errors': []
    },
    'price': {
      'messages': {
        'required':   'To pole jest wymagane.'
      },
      'errors': []
    },
    'shortDescription': {
      'messages': {
        'required':   'To pole jest wymagane.',
        'maxlength':  'To pole może zawierać maksymalnie 255 znaków.'
      },
      'errors': []
    },
    'longDescription': {
      'messages': {
        'required':   'To pole jest wymagane.',
        'maxlength':  'To pole może zawierać maksymalnie 2048 znaków.'
      },
      'errors': []
    }
  };

}
