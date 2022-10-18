import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from "@angular/router";
import { ThreeDServiceService } from 'src/app/service/spinner.service';
import { UserService } from 'src/app/service/user.service';
import { PasswordStrengthValidator } from 'src/app/shared/password-strength.validators';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: any;
  public showPassword: boolean;
  email: any;
  userId
  networkStatus: boolean = false;
  constructor(public fb: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    private threeDService: ThreeDServiceService,
    public userService: UserService,private _snackBar: MatSnackBar,) {
    this.resetPasswordForm = this.fb.group({
      new_password: [null, Validators.compose([
        Validators.required, PasswordStrengthValidator])],
      confirm_password: ['', Validators.required],

    })

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
       this.userId = params['id'];
      console.log(this.userId);
    });
    this.getPersonalDetails();
    
  }
  getPersonalDetails() {
    this.threeDService.show();
    let form = {
      id: this.userId
    }
    this.userService.getPersonalDetails(form).subscribe(res => {
      if (res.status == 200) {
        this.threeDService.hide();
        this.email = res.data.email
      } else {
        this._snackBar.open(res.message, '', {
          duration: 2000
        });
      }
    }, error => {
      this.threeDService.hide();
      if (error.status == 400) {
        this._snackBar.open(error.error.message, '', {
          duration: 2000
        });
      } else {
        this._snackBar.open(error.error.message, '', {
          duration: 2000
        });
      }
    })
  }
  resetPassword() {
    console.log(this.email, "email");
    if (this.resetPasswordForm.valid) {
      this.threeDService.show();
      let reqData = {
        email: this.email,
        password: this.resetPasswordForm.value.confirm_password,
      }
      this.userService.resetPassword(reqData).subscribe(res => {
        if  (res.status == 200) {
          this._snackBar.open(res.message, '', {
            duration: 2000
          });
        this.threeDService.hide();
        } 
        else 
         {
          this._snackBar.open(res.message, '', {
            duration: 2000
          });
          this.threeDService.hide();
        }
      }, error => {
        if (error.status == 400) {
          this._snackBar.open(error.error.message, '', {
            duration: 2000
          });

        }
          else {
            this._snackBar.open(error.error.message, '', {
              duration: 2000
            });
          }
          this.threeDService.hide();
      })
    } else {
      this.resetPasswordForm.markAllAsTouched();
    }
  }
  get f(): any {
    return this.resetPasswordForm.controls;
  }
  addValidation() {
    if (this.resetPasswordForm.value.new_password) {
      if ((this.resetPasswordForm.value.new_password)) {
        if (this.resetPasswordForm.value.new_password!= this.resetPasswordForm.value.confirm_password) {
          this.resetPasswordForm.controls['confirm_password'].setErrors({ notMatching: true });
        }
        else {
          this.resetPasswordForm.controls['confirm_password'].setErrors(null);
        }
      } else {
        this.resetPasswordForm.controls['new_password'].setErrors({ notMatching: true });
      }
    }
  }
}

