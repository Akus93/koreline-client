/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HomeComponent } from './home.component';
import {MaterialModule} from "@angular/material";
import {LessonService} from "../shared/services/lesson/lesson.service";
import {SubjectService} from "../shared/services/subject/subject.service";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StageService} from "../shared/services/stage/stage.service";
import {Ng2PaginationModule} from "ng2-pagination";
import {RouterModule} from "@angular/router";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        MaterialModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        Ng2PaginationModule,
        RouterModule,
      ],
      providers: [LessonService, SubjectService, FormBuilder, StageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
