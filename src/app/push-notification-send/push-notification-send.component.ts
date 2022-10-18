import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ThreeDServiceService } from '../service/spinner.service';
import { UserService } from '../service/user.service';
import { removeSpaces } from '../shared/must-match.validator';

@Component({
  selector: 'app-push-notification-send',
  templateUrl: './push-notification-send.component.html',
  styleUrls: ['./push-notification-send.component.scss']
})
export class PushNotificationSendComponent implements OnInit {

  allRecord: any
  allRecords
  displayedColumns: string[] = ['email',];
  allDID: [] = [];
  dataSource
  addpushNotificationForm: FormGroup;
  submitted = false;
  networkStatus: boolean = false;

  constructor(private router: Router, private threeDService: ThreeDServiceService,
    private userService: UserService, public fb: FormBuilder,private _snackBar: MatSnackBar ) {
    this.allRecord = localStorage.getItem("pushtotalRecord");
    this.allRecords = JSON.parse(this.allRecord);
    this.addpushNotificationForm = this.fb.group({
      title: ['',[Validators.required,  this.noWhitespaceValidator(),removeSpaces]],
      description: ['', [Validators.required,  this.noWhitespaceValidator(),removeSpaces]],
      userId: ['']

    });

  }
  get f(): any {
    return this.addpushNotificationForm.controls;
  }
  ngOnInit(): void {

  }
  
  noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isWhitespace = (control.value || '').trim().length === 0;
      return isWhitespace ? { whitespace: true } : null;
    };
  }
  goBack() {
    this.router.navigate(['send-notification/push-notification']);
  }
  remove(email): void {
    const index = this.allRecords.indexOf(email);
    this.allRecords.splice(index, 1);
  }
  submit() {
    this.submitted = true;
    if (this.addpushNotificationForm.invalid) {
      return;
    }
    this.threeDService.show();
    var totalRecords = [];
    for (var value of this.allRecords) {
      totalRecords.push(value.id)
    }
    this.addpushNotificationForm.value.userId = totalRecords
    if(this.addpushNotificationForm.value.userId.length==0)
    {
      this._snackBar.open("Please Select Email", '', {
        duration: 2000
      });
    }
    else{
    this.userService.pushNotification(this.addpushNotificationForm.value).subscribe(res => {
      if (res.status == 200) {
        this.threeDService.hide();
        this._snackBar.open(res.message, '', {
          duration: 2000
        });
        this.router.navigate(['send-notification/push-notification']);
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
        this.router.navigate(['send-notification/push-notification']);

      } else {
        this._snackBar.open(error.error.message, '', {
          duration: 2000
        });
        }
        this.threeDService.hide();
        this.router.navigate(['send-notification/push-notification']);

    });
  }
  }
}