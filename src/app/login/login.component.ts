import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    model: any = {};
    error: string;

    constructor(
        private router: Router,
        private authService: AuthService) { }

    login() {
        this.authService.login(this.model.username, this.model.password)
            .subscribe(
              token => {
                localStorage.setItem('token', token );
                this.router.navigate(['/']);
              },
              error =>  this.error = 'Username or password is incorrect'
            );
    }
}
