import { Component, OnInit } from '@angular/core';
import {UserService} from "../shared/services/user/user.service";
import {AuthService} from "../shared/services/auth/auth.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {UserProfile} from "../shared/models/userProfile.model";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  editProfileForm: FormGroup;

  constructor(private authService: AuthService, private userService: UserService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.userService.getCurrentUser(this.authService.getToken())
                    .subscribe(
                      user => {
                        this.editProfileForm.patchValue(user);
                        this.editProfileForm.patchValue(user.user);
                      },
                          error => {}
                    );

    this.editProfileForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      birthDate: ['']
    });

  }

  onSubmit(): void {
    if (this.editProfileForm.valid) {
      let body = {
        birthDate: this.editProfileForm.get('birthDate').value,
        user: {
          firstName: this.editProfileForm.get('firstName').value,
          lastName: this.editProfileForm.get('lastName').value
        }
      };
      this.userService.patchCurrentUser(this.authService.getToken(), body)
        .subscribe(
          user => {
            this.editProfileForm.patchValue(user);
            this.editProfileForm.patchValue(user.user);
          },
          error => {}
        );
    } else {
      console.log('Cos poszlo nie tak...');
      // TODO walidacja
    }

  }

}
