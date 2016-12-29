import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastyService} from "ng2-toasty";
import {AuthService} from "../shared/services/auth/auth.service";
import {validateConfirmPassword} from "../shared/validators/validateConfirmPassword";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder,
              private toastyService: ToastyService) { }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPassword2: ['', [Validators.required]]
    });

    this.changePasswordForm.get('newPassword2')
      .setValidators(validateConfirmPassword.bind(undefined, this.changePasswordForm.get('newPassword')));

  }

  onSubmit(): void {
    for (let field in this.errorMessages)
      this.errorMessages[field]['errors'] = [];
    let isValid: boolean = this.changePasswordForm.valid;
    if (isValid) {
      this.authService.changePassword(this.changePasswordForm.get('oldPassword').value,
                                      this.changePasswordForm.get('newPassword').value)
          .subscribe(
            response => {
              this.toastyService.success({
                title: "Sukces",
                msg: "Hasło zostało zmienione",
                showClose: true,
                timeout: 7000,
                theme: 'default',
              });
              this.changePasswordForm.reset();
            },
            error => this.showErrorsFromServer(error)
          );
    }
    else
      for (let field in this.errorMessages) {
        this.errorMessages[field]['errors'] = [];
        let ctrl = this.changePasswordForm.get(field);
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
      'old_password': 'oldPassword',
      'new_password1': 'newPassword',
      'new_password2': 'newPassword2'
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

  errorMessages = {
    'oldPassword': {
      'messages': {
        'required':   'To pole jest wymagane.',
        'minlength':  'Hasło musi posiadać conajmniej 8 znaków.',
      },
      'errors': []
    },
    'newPassword': {
      'messages': {
        'required':   'To pole jest wymagane.',
        'minlength':  'Hasło musi posiadać conajmniej 8 znaków.',
      },
      'errors': []
    },
    'newPassword2': {
      'messages': {
        'required':   'To pole jest wymagane.',
        'validateConfirmPassword':  'Hasła muszą być identyczne.',
      },
      'errors': []
    }
  };

}
