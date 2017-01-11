/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {DebugElement, NgModule} from '@angular/core';

import { WriteCommentDialogComponent } from './write-comment-dialog.component';
import {MaterialModule, MdDialogRef, MdDialogModule, MdToolbarModule, MdDialog} from "@angular/material";
import {AuthService} from "../shared/services/auth/auth.service";
import {Router} from "@angular/router";
import {CommentService} from "../shared/services/comment/comment.service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    WriteCommentDialogComponent
  ],
  entryComponents: [
    WriteCommentDialogComponent
  ],
  exports: [
    WriteCommentDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule.forRoot(),
    MdDialogModule.forRoot(),
  ]
})
class WriteCommentDialogSpecModule { }

describe('Component: Login Dialog', () => {
  let component: WriteCommentDialogComponent;
  let dialog: MdDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        WriteCommentDialogSpecModule
      ]
    });
  });

  beforeEach(() => {
    dialog = TestBed.get(MdDialog);
    let dialogRef = dialog.open(WriteCommentDialogComponent);
    component = dialogRef.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

// describe('WriteCommentDialogComponent', () => {
//   let component: WriteCommentDialogComponent;
//   let fixture: ComponentFixture<WriteCommentDialogComponent>;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ WriteCommentDialogComponent ],
//       imports: [MaterialModule],
//       providers: [
//         AuthService,
//         {
//           provide: Router,
//           useClass: class { navigate = jasmine.createSpy("navigate"); }
//         },
//         CommentService,
//         MdDialogRef
//       ]
//     })
//     .compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(WriteCommentDialogComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
