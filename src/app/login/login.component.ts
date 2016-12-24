import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared/services/auth/auth.service';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {validateEmail} from "../shared/validators/validateEmail";
import {UserService} from "../shared/services/user/user.service";

import * as Pusher from 'pusher-js';
import {SharedService} from "../shared/services/shared/shared.service";

import {MdSnackBar, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  nonFieldError: string;
  pusher: any;
  channel: any;

  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder,
              private userService: UserService, private sharedService: SharedService, private snackBar: MdSnackBar,
              public dialogRef: MdDialogRef<LoginComponent>) {}

  ngOnInit(): void {
    this.pusher = new Pusher('15b5a30c14857f14b7a3',{
      cluster: 'eu',
      encrypted: true
    });

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

  private login(): void {
    this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
        .subscribe(
          token => {
            localStorage.setItem('token', token );
            this.userService.getCurrentUserProfile(token)
                            .subscribe(
                              user => {
                                localStorage.setItem('isTeacher', user.isTeacher.toString());
                                localStorage.setItem('username', user.user.username.toString());
                                if (user.photo)
                                  localStorage.setItem('photo', user.photo.toString());
                                this.sharedService.setPusherChannel(this.pusher.subscribe(user.user.username + '-room-invite-channel'));
                                this.sharedService.getPusherChannel().subscribe(
                                      channel => channel.bind('room-invite-event', (data) => {
                                        console.log('Jest: ' + data.message);
                                        let snackBarRef = this.snackBar.open(data.message, 'Wejdz do rozmowy', {
                                          duration: 15000,
                                        });
                                        snackBarRef.onAction().subscribe(
                                          () => {
                                            this.sharedService.setCurrentConversation(data.room);
                                            this.router.navigate(['/conversation']);
                                          }
                                        );

                                      })
                                    );
                              }
                            );
            this.dialogRef.close();
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
