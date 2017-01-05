import { Component, OnInit } from '@angular/core';
import {CommentService} from "../shared/services/comment/comment.service";
import {AuthService} from "../shared/services/auth/auth.service";
import {MdDialogRef} from "@angular/material";
import {SharedService} from "../shared/services/shared/shared.service";
import {ToastyService} from "ng2-toasty";

@Component({
  selector: 'app-report-comment-dialog',
  templateUrl: './report-comment-dialog.component.html',
  styleUrls: ['./report-comment-dialog.component.css']
})
export class ReportCommentDialogComponent implements OnInit {

  error: string;

  constructor(private authService: AuthService, private commentService: CommentService,
              public dialogRef: MdDialogRef<ReportCommentDialogComponent>, private sharedService: SharedService,
              private toastyService: ToastyService) { }

  ngOnInit() {
  }

  reportComment(text: string) {
    this.error = '';
    if (text.length == 0)
      this.error = 'Treść zgłoszenia nie może być pusta.';
    else {
      this.sharedService.getReportCommentID().subscribe(
       id => {
          this.commentService.reportComment(this.authService.getToken(), id, text).subscribe(
            response => {
              this.toastyService.success({
                title: "Sukces",
                msg: "Komentarz został zgłoszony",
                showClose: true,
                timeout: 7000,
                theme: 'default',
              });
              this.dialogRef.close();
            },
            error => this.error = error.text || error.comment
          );
        }
      );
    }
  }


}
