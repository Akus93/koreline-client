import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { ToastyModule } from 'ng2-toasty';
import { ImageCropperComponent } from 'ng2-img-cropper';

import { routes } from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './shared/services/auth/auth.service';
import { UserService } from './shared/services/user/user.service';
import { AuthGuard } from './shared/guards/auth.guard';
import { RegistrationComponent } from './registration/registration.component';
import {LessonService} from "./shared/services/lesson/lesson.service";
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { ViewLessonComponent } from './view-lesson/view-lesson.component';
import {SubjectService} from "./shared/services/subject/subject.service";
import { CreateLessonComponent } from './create-lesson/create-lesson.component';
import { EditPhotoComponent } from './edit-photo/edit-photo.component';
import {TeacherGuard} from "./shared/guards/teacher.guard";
import {StageService} from "./shared/services/stage/stage.service";
import { MyLessonsComponent } from './my-lessons/my-lessons.component';
import { TeacherLessonsComponent } from './teacher-lessons/teacher-lessons.component';
import { ConversationRoomComponent } from './conversation-room/conversation-room.component';
import {ConversationService} from "./shared/services/conversation/conversation.service";
import {SharedService} from "./shared/services/shared/shared.service";
import {NotificationService} from "./shared/services/notification/notification.service";
import { FlexLayoutModule } from '@angular/flex-layout';
import { EditLessonComponent } from './edit-lesson/edit-lesson.component';
import { AccountComponent } from './account/account.component';
import {MessageService} from "./shared/services/message/message.service";
import { SendMessageDialogComponent } from './send-message-dialog/send-message-dialog.component';
import { MessagesComponent } from './messages/messages.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {Ng2PaginationModule} from 'ng2-pagination';
import {EventsService} from "./shared/services/events/events.service";
import { WriteCommentDialogComponent } from './write-comment-dialog/write-comment-dialog.component';
import {CommentService} from "./shared/services/comment/comment.service";
import { ReportCommentDialogComponent } from './report-comment-dialog/report-comment-dialog.component';
import { ManageTokensComponent } from './manage-tokens/manage-tokens.component';
import {BillService} from "./shared/services/bill/bill.service";
import { TeacherBillsComponent } from './teacher-bills/teacher-bills.component';
import { MyBillsComponent } from './my-bills/my-bills.component';
import { CreateBillDialogComponent } from './create-bill-dialog/create-bill-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistrationComponent,
    EditProfileComponent,
    ViewProfileComponent,
    ViewLessonComponent,
    CreateLessonComponent,
    EditPhotoComponent,
    ImageCropperComponent,
    MyLessonsComponent,
    TeacherLessonsComponent,
    ConversationRoomComponent,
    EditLessonComponent,
    AccountComponent,
    SendMessageDialogComponent,
    MessagesComponent,
    ChangePasswordComponent,
    WriteCommentDialogComponent,
    ReportCommentDialogComponent,
    ManageTokensComponent,
    TeacherBillsComponent,
    MyBillsComponent,
    CreateBillDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    ToastyModule.forRoot(),
    FlexLayoutModule.forRoot(),
    Ng2PaginationModule
  ],
  providers: [
    AuthService,
    UserService,
    LessonService,
    SubjectService,
    StageService,
    ConversationService,
    SharedService,
    NotificationService,
    MessageService,
    EventsService,
    CommentService,
    BillService,
    AuthGuard,
    TeacherGuard
    ],
  entryComponents: [
    SendMessageDialogComponent,
    WriteCommentDialogComponent,
    ReportCommentDialogComponent,
    CreateBillDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
