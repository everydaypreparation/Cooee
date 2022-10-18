import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { UserChangePasswordComponent } from '../user-change-password/user-change-password.component';
import { UserDetailApproveComponent } from '../user-detail-approve/user-detail-approve.component';
import { UserDetailRejectComponent } from '../user-detail-reject/user-detail-reject.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userDetailForm: FormGroup;
  idCardFront: any
  idCardSelfie: any
  isPorting: any
  id: any;
  approved
  imgurl
  networkStatus: boolean = false;

  constructor(private router: Router, public dialog: MatDialog,
    private userService: UserService, public fb: FormBuilder, private route: ActivatedRoute,
    private _snackBar: MatSnackBar
    ) {
    this.userDetailForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      date: [''],
      currentServiceProvider: [''],
      optusAccountNumber: [''],
      country: [''],
      address: [''],
      city: [''],
      state: [''],
      postalCode: [''],
      stipeCustomerId: [''],
      did: [''],
      cooeeId: [''],
      socialId: [''],
      otp: [''],
      idCardType: [''],
    });
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get('id');
    this.getPersonalDetails()
  }
  goBack() {
    this.router.navigate(['usermanagement']);
  }
  get f() { return this.userDetailForm.controls; }

  getPersonalDetails() {
    // this.threeDService.show();
    let form = {
      id: this.id
    }
    // this.imgurl="http://92.204.128.10:8080/"
    // .replace(this.imgurl,"https://secureparcelservice.com:8443/"),
    this.userService.getPersonalDetails(form).subscribe(res => {
      if (res.status == 200) {
        // this.threeDService.hide();
        this.idCardFront = res.data.idCardFront
        this.idCardSelfie = res.data.idCardSelfie
        this.isPorting = res.data.isPorting

        console.log(this.idCardFront)
        console.log(this.idCardSelfie)
        this.approved = res.data.approved
        console.log(this.approved)
        this.userDetailForm.patchValue({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          date: res.data.dob,
          currentServiceProvider: res.data.currentServiceProvider,
          optusAccountNumber: res.data.optusAccountNumber,
          country: res.data.country,
          address: res.data.address,
          city: res.data.city,
          state: res.data.state,
          postalCode: res.data.postalCode,
          cooeeId: res.data.cooeeId,
          stipeCustomerId: res.data.stipeCustomerId,
          socialId: res.data.socialId,
          did: res.data.did,
          otp: res.data.otp,
          idCardType: res.data.idCardType,

        })

      } else {
        this._snackBar.open(res.message, '', {
          duration: 2000
        });
      }
    }, error => {
      // this.threeDService.hide();
      if (error.status == 400) {
        this._snackBar.open(error.error.message, '', {
          duration: 2000
        });
      } else {
        this._snackBar.open(error.error.message, '', {
          duration: 2000
        });
        }
        // this.threeDService.hide();
    })
  }

  approve() {
    const dialogRef = this.dialog.open(UserDetailApproveComponent, {
      width: '400px',
      data: this.id
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.getAllUsers();
      console.log(result);
    });

    // console.log(userId)
    // localStorage.setItem("userId", userId)
    // sessionStorage.setItem("selection", JSON.stringify(this.selection));
    // this.router.navigate(['admin/update-active-user']);
  }
  

  reject() {
    const dialogRef = this.dialog.open(UserDetailRejectComponent, {
      maxWidth: '600px',
      width: '100%',
      data: this.id
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.getAllUsers();
      console.log(result);
    });

    // console.log(userId)
    // localStorage.setItem("userId", userId)
    // sessionStorage.setItem("selection", JSON.stringify(this.selection));
    // this.router.navigate(['admin/update-active-user']);
  }
  changePassword() {
    const dialogRef = this.dialog.open(UserChangePasswordComponent, {
      // height: '280px',
      width: '400px',
      data: this.id
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.getAllUsers();
      console.log(result);
    });

    // console.log(userId)
    // localStorage.setItem("userId", userId)
    // sessionStorage.setItem("selection", JSON.stringify(this.selection));
    // this.router.navigate(['admin/update-active-user']);
  }
}
