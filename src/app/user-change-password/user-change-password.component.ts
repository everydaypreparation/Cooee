import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ThreeDServiceService } from '../service/spinner.service';
import { UserService } from '../service/user.service';
import { removeSpaces } from '../shared/must-match.validator';
import { PasswordStrengthValidator } from '../shared/password-strength.validators';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.scss']
})
export class UserChangePasswordComponent implements OnInit {

  userChangePasswordForm: any;
  public showPassword: boolean;
  email: any;
  userId
  networkStatus: boolean = false;
  constructor(public fb: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    private threeDService: ThreeDServiceService,
    public dialogRef: MatDialogRef<UserChangePasswordComponent>,
    public userService: UserService,private _snackBar: MatSnackBar,) {
    this.userChangePasswordForm = this.fb.group({
      new_password: ['', Validators.compose([
        Validators.required, PasswordStrengthValidator,removeSpaces])],
      confirm_password: ['', Validators.required,removeSpaces],

    })

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['id'];
      console.log(this.userId);
    });

  }

  closeDialog() {
    this.dialogRef.close();
  }
  userChangePassword() {
    console.log(this.email, "email");
    if (this.userChangePasswordForm.valid) {
      this.threeDService.show();
      let reqData = {
        id: this.userId,
        password: this.userChangePasswordForm.value.confirm_password,
      }
      this.userService.userChangePassword(reqData).subscribe(res => {
        if (res.status == 200) {
          // this.toastr.success(res.message);
          this._snackBar.open(res.message, '', {
            duration: 2000
          });
          this.dialogRef.close();
        this.threeDService.hide();
        this.router.navigate(['usermanagement']);
        }
        else {
          // this.toastr.error(res.message);
          this.threeDService.hide();
        }
      }, 
      error => {
        if (error.status == 400) {
          this._snackBar.open(error.error.message, '', {
            duration: 2000
          });
          this.threeDService.hide();
        }
        else {
          this._snackBar.open(error.error.message, '', {
            duration: 2000
          });
        }
      })
      this.threeDService.hide();
      this.userChangePasswordForm.markAllAsTouched();
    }
  }
  get f(): any {
    return this.userChangePasswordForm.controls;
  }
  addValidation() {
    if (this.userChangePasswordForm.value.new_password) {
      if ((this.userChangePasswordForm.value.new_password)) {
        if (this.userChangePasswordForm.value.new_password != this.userChangePasswordForm.value.confirm_password) {
          this.userChangePasswordForm.controls['confirm_password'].setErrors({ notMatching: true });
        }
        else {
          this.userChangePasswordForm.controls['confirm_password'].setErrors(null);
        }
      } else {
        this.userChangePasswordForm.controls['new_password'].setErrors({ notMatching: true });
      }
    }
  }
}
