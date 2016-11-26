import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { HomeComponent } from './home/home.component';
import {EditProfileComponent} from "./edit-profile/edit-profile.component";
import {ViewProfileComponent} from "./view-profile/view-profile.component";
import {ViewLessonComponent} from "./view-lesson/view-lesson.component";
import {CreateLessonComponent} from "./create-lesson/create-lesson.component";
import {EditPhotoComponent} from "./edit-photo/edit-photo.component";
import {TeacherGuard} from "./shared/guards/teacher.guard";
import {MyLessonsComponent} from "./my-lessons/my-lessons.component";


export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
      path: 'registration',
      component: RegistrationComponent
    },
    {
      path: 'user/edit-profile',
      component: EditProfileComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'user/edit-photo',
      component: EditPhotoComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'user/my-lessons',
      component: MyLessonsComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'user/:username',
      component: ViewProfileComponent,
    },
    {
      path: 'lesson/create',
      component: CreateLessonComponent,
      canActivate: [AuthGuard, TeacherGuard]
    },
    {
      path: 'lesson/:slug',
      component: ViewLessonComponent,
    },
    {
        path: '',
        component: HomeComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
