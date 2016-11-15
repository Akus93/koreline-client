import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { HomeComponent } from './home/home.component';
import {EditProfileComponent} from "./edit-profile/edit-profile.component";
import {ViewProfileComponent} from "./view-profile/view-profile.component";


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
      path: 'user/:username',
      component: ViewProfileComponent,
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
