import { Component, OnInit } from '@angular/core';
import {UserService} from "../shared/services/user/user.service";
import {AuthService} from "../shared/services/auth/auth.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ToastyService} from "ng2-toasty";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  editProfileForm: FormGroup;

  constructor(private authService: AuthService, private userService: UserService,
              private formBuilder: FormBuilder, private toastyService: ToastyService) { }

  ngOnInit(): void {

    this.editProfileForm = this.formBuilder.group({
      firstName: ['', [Validators.maxLength(30)]],
      lastName: ['', [Validators.maxLength(30)]],
      birthDate: ['', [Validators.pattern('([0-9]{4})-([0-9]{2})-([0-9]{2})')]],
      headline: ['', [Validators.maxLength(70)]],
      biography: ['', [Validators.maxLength(2048)]]
    });

    this.userService.getCurrentUserProfile(this.authService.getToken())
                    .subscribe(
                      user => {
                        this.editProfileForm.patchValue(user);
                        this.editProfileForm.patchValue(user.user);
                      },
                          error => this.showErrorsFromServer(error)
                    );
  }

  onSubmit(): void {
    for (let field in this.errorMessages)
      this.errorMessages[field]['errors'] = [];
    if (this.editProfileForm.valid) {
      let body = {
        birthDate: this.editProfileForm.get('birthDate').value,
        headline: this.editProfileForm.get('headline').value,
        biography: this.editProfileForm.get('biography').value,
        user: {
          firstName: this.editProfileForm.get('firstName').value,
          lastName: this.editProfileForm.get('lastName').value
        }
      };
      this.userService.patchCurrentUserProfile(this.authService.getToken(), body)
        .subscribe(
          user => {
            this.editProfileForm.patchValue(user);
            this.editProfileForm.patchValue(user.user);
            this.toastyService.success({
              title: "Sukces",
              msg: "Twoje dane zostały zmienione",
              showClose: true,
              timeout: 7000,
              theme: 'default',
            });
          },
          error => this.showErrorsFromServer(error)
        );
    } else {
      for (let field in this.errorMessages) {
        this.errorMessages[field]['errors'] = [];
        let ctrl = this.editProfileForm.get(field);
        if (ctrl.invalid) {
          let messages = this.errorMessages[field]['messages'];
          for (let key in ctrl.errors) {
            this.errorMessages[field]['errors'].push(messages[key]);
          }
        }
      }
    }
  }

  private showErrorsFromServer(error: JSON) {
    for (let field in error)
      if (field in this.errorMessages)
        this.errorMessages[field]['errors'] = error[field];
  }

  errorMessages = {
    'firstName': {
      'messages': {
        'maxlength': 'Imię może posiadać maksymalnie 30 znaków.'
      },
      'errors': []
    },
    'lastName': {
      'messages': {
        'maxlength': 'Nazwisko może posiadać maksymalnie 30 znaków.'
      },
      'errors': []
    },
    'birthDate': {
      'messages': {
        'pattern': 'Data urodzenia ma niepoprawny format. Użyj formatu \'yyyy-mm-dd\''
      },
      'errors': []
    },
    'headline': {
      'messages': {
        'maxlength': 'Nagłówek może posiadać maksymalnie 30 znaków.'
      },
      'errors': []
    },
    'biography': {
      'messages': {
        'maxlength': 'Biografia może posiadać maksymalnie 2048 znaków.'
      },
      'errors': []
    },
  };

}
