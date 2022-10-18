import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from "@angular/router";
import { Links } from 'src/app/links.module';
import { ThreeDServiceService } from 'src/app/service/spinner.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  version = Links.VERSION
  networkStatus: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private ThreeDService: ThreeDServiceService,
    private _snackBar: MatSnackBar,

  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid && this.loginForm.value.password !== '') {
      this.ThreeDService.show();
      this.userService.login(this.loginForm.value).subscribe(res => {
        this.ThreeDService.hide();
        if (res.status == 200) {
          console.log(res.data.loginStatus)
          sessionStorage.setItem("loginStatus", res.data.loginStatus);
          this.router.navigate(['dashboard/default']);
          this._snackBar.open(res.message, '', {
            duration: 2000
          });
        }
        else {
        }
      }, error => {
        this.ThreeDService.hide();
        if (error.status == 400) {
          this._snackBar.open(error.message, '', {
            duration: 2000
          });
        } else {
        }
        this.ThreeDService.hide();
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  forget() {
    this.router.navigate(['auth/forgot-password']);
  }
}
