import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/services/auth/auth.service";
import {CommentService} from "../shared/services/comment/comment.service";
import {MdDialogRef} from "@angular/material";
import {SharedService} from "../shared/services/shared/shared.service";
import {ToastyService} from "ng2-toasty";

@Component({
  selector: 'app-write-comment-dialog',
  templateUrl: './write-comment-dialog.component.html',
  styleUrls: ['./write-comment-dialog.component.css']
})
export class WriteCommentDialogComponent implements OnInit {

  error: string;

  constructor(private authService: AuthService, private commentService: CommentService,
              public dialogRef: MdDialogRef<WriteCommentDialogComponent>, private sharedService: SharedService,
              private toastyService: ToastyService) { }

  ngOnInit() {

  }

  createComment(rate: number, text: string) {
    this.error = '';
    if (text.length == 0)
      this.error = 'Treść komentarza nie może być pusta.';
    else if (rate > 5 || rate < 1)
      this.error = 'Ocena musi być z przedziału od 1 do 5.';
    else {
      this.sharedService.getUsernameForComment().subscribe(
        username => {
          this.commentService.createComment(this.authService.getToken(), username, text, rate).subscribe(
            comment => {
              this.toastyService.success({
                title: "Sukces",
                msg: "Komentarz został dodany",
                showClose: true,
                timeout: 7000,
                theme: 'default',
              });
              this.dialogRef.close();
            },
            error => this.error = error.text || error.rating
          );
        }
      );
    }
  }

}
