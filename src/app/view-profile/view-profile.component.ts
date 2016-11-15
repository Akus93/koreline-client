import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../shared/services/user/user.service";
import {UserProfile} from "../shared/models/userProfile.model";

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  user: UserProfile;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
    let getProfileByUsername$ = this.route.params.switchMap(params => this.userService.getUserProfile(params['username']));
    getProfileByUsername$.subscribe(
      user => this.user = user,
      error => {}
    );
  }

}
