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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    ToastyModule.forRoot()
  ],
  providers: [
    AuthService,
    UserService,
    LessonService,
    SubjectService,
    StageService,
    AuthGuard,
    TeacherGuard
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
