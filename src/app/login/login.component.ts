import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared/services/auth/auth.service';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {validateEmail} from "../shared/validators/validateEmail";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  nonFieldError: string;

  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, validateEmail]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

  }

  public onSubmit(): void {
    for (let field in this.errorMessages)
      this.errorMessages[field]['errors'] = [];

    if (this.loginForm.valid) {
      this.login();
    }
    else {
      for (let field in this.errorMessages) {
        let ctrl = this.loginForm.get(field);
        if (ctrl.invalid) {
          let messages = this.errorMessages[field]['messages'];
          for (let key in ctrl.errors) {
            this.errorMessages[field]['errors'].push(messages[key]);
          }
        }
      }
    }
  }

  private login() {
    this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
        .subscribe(
          token => {
            localStorage.setItem('token', token );
            this.router.navigate(['/']);
          },
          error => this.showErrorsFromServer(error)
        );
    }

  private showErrorsFromServer(error: JSON): void {
    for (let field in error)
      if (field in this.errorMessages)
        this.errorMessages[field]['errors'] = error[field];
    this.nonFieldError = error['non_field_errors'][0] || '';
  }

  errorMessages = {
    'email': {
      'messages': {
        'required': 'To pole jest wymagane.',
        'validateEmail':  'Niepoprawny adres email.'
      },
      'errors': []
    },
    'password': {
      'messages': {
        'required': 'To pole jest wymagane.',
        'minlength':  'Hasło musi posiadać conajmniej 8 znaków.'
      },
      'errors': []
    },
  };

}
