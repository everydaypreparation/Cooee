import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-email-management',
  templateUrl: './email-management.component.html',
  styleUrls: ['./email-management.component.scss']
})
export class EmailManagementComponent implements OnInit {

  addemailForm: FormGroup;
  submitted = false;
  isShown: boolean = false;
  networkStatus: boolean = false;
  selection: any;
  email: any;
  resultsLength: number = 0;
  selectedValue = '';
  emailTypeData: any[] = [{ id: "ResetPassword", value: "Reset Password" }, { id: "Login", value: "Login" }, { id: "SignUP", value: "SignUp" }, { id: "ApproveKyc", value: "Approve Kyc" }, { id: "ResetPasswordForUser", value: "Reset Password For User" }];
  constructor(private router: Router, private userService: UserService, public fb: FormBuilder, private _snackBar: MatSnackBar,) {
    this.addemailForm = this.fb.group({
      emailBody: ['', Validators.required],
      emailType: ['',],

    });
  }

  ngOnInit(): void {
  }
  get f() { return this.addemailForm.controls; }

  kycStatusChange() {
    this.getAllEmail();
    this.isShown = true
  }
  getAllEmail() {
    // this.threeDService.show();
    this.userService.getAllEmail(this.selectedValue).subscribe(res => {
      if (res.status == 200) {
        this.email = res.data;
        this.addemailForm.patchValue({
          emailBody: this.email
        });
        // this.threeDService.hide();
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
        // this.threeDService.hide();
      } else {
        this._snackBar.open(error.error.message, '', {
          duration: 2000
        });
        // this.threeDService.hide();
      }
    });
  }
  submit() {
    this.submitted = true;
    if (this.addemailForm.invalid) {
      return;
    }
    this.addemailForm.value.emailType = this.selectedValue
    // this.threeDService.show();
    this.userService.addEmail(this.addemailForm.value).subscribe(res => {
      if (res.status == 200) {
        // this.threeDService.hide();
        window.location.reload();
        this._snackBar.open(res.message, '', {
          duration: 2000
        });
        
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
        // this.threeDService.hide();
      } else {
        this._snackBar.open(error.error.message, '', {
          duration: 2000
        });
      }
      // this.threeDService.hide();
    });
  }

}
