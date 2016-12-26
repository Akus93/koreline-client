import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';

import { validateEmail } from '../shared/validators/validateEmail';
import {validateConfirmPassword} from '../shared/validators/validateConfirmPassword';
import {UserService} from '../shared/services/user/user.service';
import {Router} from "@angular/router";
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService,
              public dialogRef: MdDialogRef<RegistrationComponent>) { }

  ngOnInit(): void {

    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, validateEmail]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    });

    this.registrationForm.get('confirmPassword')
      .setValidators(validateConfirmPassword.bind(undefined, this.registrationForm.get('password')));

    this.registrationForm.valueChanges
      .subscribe(data => this.onFormChanged());

  }

  onSubmit(): void {
    let isValid: boolean = this.registrationForm.valid;
    if (isValid) {
      this.userService.createUser(this.registrationForm.get('email').value,
                                  this.registrationForm.get('password').value,
                                  this.registrationForm.get('confirmPassword').value)
                      .subscribe(
                        token => {
                          sessionStorage.setItem('token', token );
                          this.router.navigate(['/']);
                          this.dialogRef.close();
                        },
                        error => this.showErrorsFromServer(error)
                      );
    }
    else
      for (let field in this.errorMessages) {
        this.errorMessages[field]['errors'] = [];
        let ctrl = this.registrationForm.get(field);
        if (ctrl.invalid) {
          let messages = this.errorMessages[field]['messages'];
          for (let key in ctrl.errors) {
            this.errorMessages[field]['errors'].push(messages[key]);
          }
        }
      }
  }

  private translateErrorResponse(error: JSON): {} {
    const translations = {
      'email': 'email',
      'password1': 'password',
      'password2': 'confirmPassword'
    };
    let result = {};
    for (let field in error){
      let newName: string = translations[field];
      result[newName] = error[field];
    }
    return result
  }

  private showErrorsFromServer(error: JSON) {
    const translatedError: {} = this.translateErrorResponse(error);
    for (let field in translatedError)
      if (field in this.errorMessages)
        this.errorMessages[field]['errors'] = translatedError[field];
  }

  private onFormChanged(): void {
    for (let field in this.errorMessages) {
      this.errorMessages[field]['errors'] = [];
      let ctrl = this.registrationForm.get(field);
      if (ctrl.dirty && ctrl.invalid) {
        let messages = this.errorMessages[field]['messages'];
        for (let key in ctrl.errors) {
          this.errorMessages[field]['errors'].push(messages[key]);
        }
      }
    }
  }

  errorMessages = {
    'email': {
      'messages': {
        'required':       'To pole jest wymagane.',
        'validateEmail':  'Niepoprawny adres email.'
      },
      'errors': []
    },
    'password': {
      'messages': {
        'required':   'To pole jest wymagane.',
        'minlength':  'Hasło musi posiadać conajmniej 8 znaków.',
      },
      'errors': []
    },
    'confirmPassword': {
      'messages': {
        'required':   'To pole jest wymagane.',
        'validateConfirmPassword':  'Hasła muszą być identyczne.',
      },
      'errors': []
    }
  };
}
