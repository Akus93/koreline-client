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
import {TeacherLessonsComponent} from "./teacher-lessons/teacher-lessons.component";
import {ConversationRoomComponent} from "./conversation-room/conversation-room.component";
import {EditLessonComponent} from "./edit-lesson/edit-lesson.component";
import {AccountComponent} from "./account/account.component";
import {MessagesComponent} from "./messages/messages.component";
import {TeacherBillsComponent} from "./teacher-bills/teacher-bills.component";
import {MyBillsComponent} from "./my-bills/my-bills.component";


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
      path: 'account',
      component: AccountComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'messages',
      component: MessagesComponent,
      canActivate: [AuthGuard]
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
      path: 'user/my-bills',
      component: MyBillsComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'teacher/my-lessons',
      component: TeacherLessonsComponent,
      canActivate: [AuthGuard, TeacherGuard]
    },
    {
      path: 'teacher/my-bills',
      component: TeacherBillsComponent,
      canActivate: [AuthGuard, TeacherGuard]
    },
    {
      path: 'user/:username',
      component: ViewProfileComponent,
    },
    {
      path: 'lesson/create',
      component: CreateLessonComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'lesson/edit/:slug',
      component: EditLessonComponent,
      canActivate: [AuthGuard, TeacherGuard]
    },
    {
      path: 'lesson/:slug',
      component: ViewLessonComponent,
    },
    {
      path: 'conversation',
      component: ConversationRoomComponent,
      canActivate: [AuthGuard]
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
