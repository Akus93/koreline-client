import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';

import { validateEmail } from '../shared/validators/validateEmail';
import {validateConfirmPassword} from "../shared/validators/validateConfirmPassword";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(6), validateEmail]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      firstName: ['', [Validators.required, Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.maxLength(30)]]
    });

    this.registrationForm.get('confirmPassword')
      .setValidators(validateConfirmPassword.bind(undefined, this.registrationForm.get('password')));

    this.registrationForm.get('email').valueChanges
      .filter(() => this.registrationForm.get('email').valid)
      .do(email => console.log(email))
      .subscribe();

    this.registrationForm.valueChanges
      .subscribe(data => this.onFormChanged());

  }

  onSubmit(): void {
    let isValid: boolean = this.registrationForm.valid;
    if (isValid)
      console.log('Poprawne dane.');
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

  onFormChanged() {
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
        'minlength':      'Adres email musi posiadać conajmniej 6 znaków.',
        'validateEmail':  'Niepoprawny adres email.'
      },
      'errors': []
    },
    'password': {
      'messages': {
        'required':   'To pole jest wymagane.',
        'minlength':  'Hasło musi posiadać conajmniej 6 znaków.',
      },
      'errors': []
    },
    'confirmPassword': {
      'messages': {
        'required':   'To pole jest wymagane.',
        'validateConfirmPassword':  'Hasła muszą być identyczne.',
      },
      'errors': []
    },
    'firstName': {
      'messages': {
        'required':   'To pole jest wymagane.',
      },
      'errors': []
    },
    'lastName': {
      'messages': {
        'required':   'To pole jest wymagane.',
      },
      'errors': []
    }
  };

}
