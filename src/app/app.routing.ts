import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { HomeComponent } from './home/home.component';


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
        path: '',
        component: HomeComponent
        //canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
