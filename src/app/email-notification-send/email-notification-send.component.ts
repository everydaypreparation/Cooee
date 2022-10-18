import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ThreeDServiceService } from '../service/spinner.service';
import { UserService } from '../service/user.service';
import { removeSpaces } from '../shared/must-match.validator';

@Component({
  selector: 'app-email-notification-send',
  templateUrl: './email-notification-send.component.html',
  styleUrls: ['./email-notification-send.component.scss']
})
export class EmailNotificationSendComponent implements OnInit {

  allRecord: any
  allRecords
  addemailNotificationForm: FormGroup;
  submitted = false;
  networkStatus: boolean = false;
  constructor(private router: Router, private threeDService: ThreeDServiceService,
    private userService: UserService, public fb: FormBuilder,private _snackBar: MatSnackBar) {
    this.allRecord = localStorage.getItem("totalRecord");
    this.allRecords = JSON.parse(this.allRecord);
    this.addemailNotificationForm = this.fb.group({
      title: ['',[Validators.required,  this.noWhitespaceValidator(),removeSpaces]],
      description: ['', [Validators.required,  this.noWhitespaceValidator(),removeSpaces]],
      userId: []

    });

  }

  get f(): any {
    return this.addemailNotificationForm.controls;
  }
  noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isWhitespace = (control.value || '').trim().length === 0;
      return isWhitespace ? { whitespace: true } : null;
    };
  }
  ngOnInit(): void {

  }
  goBack() {
    this.router.navigate(['send-notification/email-notification']);
  }

  remove(email): void {
    const index = this.allRecords.indexOf(email);
    this.allRecords.splice(index, 1);
  }

  submit() {
    this.submitted = true;
    if (this.addemailNotificationForm.invalid) {
      return;
    }
    
    var totalRecords = [];
      for (var value of this.allRecords) {
      totalRecords.push(value.id)
    }
    this.addemailNotificationForm.value.userId=totalRecords
    this.threeDService.show();
    console.log(this.addemailNotificationForm.value.userId.length);
    
    if(this.addemailNotificationForm.value.userId.length==0)
    {
      this._snackBar.open("Please Select Email", '', {
        duration: 2000
      });
    }
    else{
      this.userService.emailNotification(this.addemailNotificationForm.value).subscribe(res => {
        if (res.status == 200) {
          this.threeDService.hide();
          this._snackBar.open(res.message, '', {
            duration: 2000
          });
          this.router.navigate(['send-notification/email-notification']);
        }
        else {
          this._snackBar.open(res.message, '', {
            duration: 2000
          });
        }
      }, error => {
        if (error.status == 400) {
          this._snackBar.open(error.error.message, '', {
            duration: 2000
          });
          this.threeDService.hide();
          this.router.navigate(['send-notification/email-notification']);
  
        } else {
          this._snackBar.open(error.error.message, '', {
            duration: 2000
          });
          }
          this.router.navigate(['send-notification/email-notification']);
          this.threeDService.hide();
      });
    }
    
  }
}