import {Component, OnInit, ViewChild} from '@angular/core';
import {CropperSettings, ImageCropperComponent} from 'ng2-img-cropper';
import {UserService} from "../shared/services/user/user.service";
import {AuthService} from "../shared/services/auth/auth.service";
import {ToastyService} from "ng2-toasty";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-photo',
  templateUrl: './edit-photo.component.html',
  styleUrls: ['./edit-photo.component.css'],

})
export class EditPhotoComponent implements OnInit {

  data: any;
  cropperSettings: CropperSettings;

  @ViewChild('cropper', undefined)
  cropper:ImageCropperComponent;

  constructor(private userService: UserService, private authService: AuthService, private toastyService: ToastyService) { }

  ngOnInit() {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 250;
    this.cropperSettings.height = 250;

    this.cropperSettings.croppedWidth = 250;
    this.cropperSettings.croppedHeight = 250;

    this.cropperSettings.canvasWidth = 533;
    this.cropperSettings.canvasHeight = 300;

    this.cropperSettings.minWidth = 250;
    this.cropperSettings.minHeight = 250;

    this.cropperSettings.rounded = true;

    this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(200,200,200,0.5)';
    this.cropperSettings.cropperDrawSettings.strokeWidth = 5;
    this.cropperSettings.noFileInput = true;

    this.data = {}
  }

  fileChangeListener($event) {
    let image:any = new Image();
    let file:File = $event.target.files[0];
    let myReader:FileReader = new FileReader();
    let that = this;
    myReader.onloadend = function (loadEvent:any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
    };
    myReader.readAsDataURL(file);
  }

  savePhoto(): void {
    let token = this.authService.getToken();
    this.userService.patchCurrentUserProfile(token, {'photo': this.data.image})
      .subscribe(
        res => {
          localStorage.setItem('photo', this.data.image.toString());
          this.toastyService.success({
            title: "Sukces",
            msg: "Twoje zdjęcie zostało zapisane",
            showClose: true,
            timeout: 7000,
            theme: 'default',
          });
        },
        error => {}
      );
  }

}
