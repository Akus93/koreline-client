/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AccountComponent } from './account.component';
import {MaterialModule} from "@angular/material";
import {AuthService} from "../shared/services/auth/auth.service";
import {EditProfileComponent} from "../edit-profile/edit-profile.component";
import {EditPhotoComponent} from "../edit-photo/edit-photo.component";
import {ChangePasswordComponent} from "../change-password/change-password.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ImageCropperComponent, ImageCropperModule} from "ng2-img-cropper";
import {RouterModule} from "@angular/router";

let authServiceStub = {
 photo: 'assets/profile.png',
};

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountComponent, EditProfileComponent, EditPhotoComponent, ChangePasswordComponent, ImageCropperComponent
        ],
      imports: [
        MaterialModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        RouterModule
      ],
      providers: [AuthService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    let authService = fixture.debugElement.injector.get(AuthService);
    let spy = spyOn(authService, 'getPhoto').and.returnValue(Promise.resolve(authServiceStub.photo));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
