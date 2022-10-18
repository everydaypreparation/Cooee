import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { removeSpaces } from '../shared/must-match.validator';

@Component({
  selector: 'app-user-refund-reject',
  templateUrl: './user-refund-reject.component.html',
  styleUrls: ['./user-refund-reject.component.scss']
})
export class UserRefundRejectComponent implements OnInit {

  submitted = false;
  returnUrl: string;
  error = '';
  userRefundForm: FormGroup;
  networkStatus: boolean = false;
  constructor(private router: Router, public dialogRef: MatDialogRef<UserRefundRejectComponent>,
    @Inject(MAT_DIALOG_DATA) public refundId: any, public fb: FormBuilder,private _snackBar: MatSnackBar,
    private descriptionservice: UserService) {
    this.userRefundForm = this.fb.group({
      requestId: [refundId],
      reason: ['', Validators.required,removeSpaces],
    });
  }

  ngOnInit(): void {
    console.log(this.refundId)
  }

  
  goBack() {
    this.router.navigate(['userdetails']);
  }
  closeDialog() {
    this.dialogRef.close();
  }
  get f() { return this.userRefundForm.controls; }

  submit() {
    this.submitted = true;
    if (this.userRefundForm.invalid) {
      return;
    }
    // this.threeDService.show();
    this.descriptionservice.refundReject(this.userRefundForm.value).subscribe(res => {
      // this.threeDService.hide();
      if (res.status == 200) {
        this._snackBar.open(res.message, '', {
          duration: 2000
        });
        this.dialogRef.close();
        this.router.navigate(['usermanagement']);
      }
    });

    error => {
      // this.threeDService.hide();
      if (error.status == 400) {
        this._snackBar.open(error.error.message, '', {
          duration: 2000
        });
        this.closeDialog()
      } else {
        this._snackBar.open(error.error.message, '', {
          duration: 2000
        });
        }
        this.closeDialog()
        // this.threeDService.hide();

      }
  }
}
