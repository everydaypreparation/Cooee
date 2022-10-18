import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from "@angular/router";
import { ThreeDServiceService } from 'src/app/service/spinner.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {


  forgotPasswordForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  emailsession: string;
  emailsessions: void;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private ThreeDService: ThreeDServiceService,
    private _snackBar: MatSnackBar
  ) {

  }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', Validators.required],
    })
  }

  get f() { return this.forgotPasswordForm.controls; }

  forgot() {
    this.ThreeDService.show();
    this.submitted = true;
    localStorage.setItem("emailsession", this.forgotPasswordForm.value.email);
    if (this.forgotPasswordForm.valid) {
      this.userService.forgotPassword(this.forgotPasswordForm.value).subscribe(res => {
        if (res.status == 200) {
          this._snackBar.open(res.message, '', {
            duration: 2000
          });
          this.ThreeDService.hide();
        }
      }, error => {
        if (error.status == 400) {
          this._snackBar.open(error.error.message, '', {
            duration: 2000
          });
          this.ThreeDService.hide();
        }
        else {
          this._snackBar.open(error.error.message, '', {
            duration: 2000
          });
        }
      });
    } else {
      this.forgotPasswordForm.markAllAsTouched();
    }
  }
  back() {
    this.router.navigate(['auth/forgot']);
  }
}