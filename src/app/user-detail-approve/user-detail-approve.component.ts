import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-detail-approve',
  templateUrl: './user-detail-approve.component.html',
  styleUrls: ['./user-detail-approve.component.scss']
})
export class UserDetailApproveComponent implements OnInit {

  submitted = false;
  returnUrl: string;
  error = '';
  userRejectForm: FormGroup;
  networkStatus: boolean = false;
  constructor(private router: Router,public dialogRef: MatDialogRef<UserDetailApproveComponent>,
   @Inject(MAT_DIALOG_DATA) public approveUserId: any,public fb: FormBuilder,private _snackBar: MatSnackBar,
   private userService:UserService) { 
  }

  ngOnInit(): void {
    console.log(this.approveUserId)
  }
  goBack() {
    this.router.navigate(['admin/userdetails']);
  }
  closeDialog() {
    this.dialogRef.close();
  }

  submit() {
    let form={
      userId:this.approveUserId
    }
    // this.threeDService.show();
    this.userService.approveKyc(form).subscribe(res => {
      if (res.status == 200) {
      // this.threeDService.hide();
      this._snackBar.open(res.message, '', {
        duration: 2000
      });
        this.dialogRef.close();
        this.router.navigate(['usermanagement']);
      }
      else {
        // this.toastr.error(res.message);
        this._snackBar.open(res.message, '', {
          duration: 2000
        });
      }
    },
     error => {
      // this.threeDService.hide();
      if (error.status == 400) {
        this._snackBar.open(error.error.message, '', {
          duration: 2000
        });
        this.dialogRef.close();
      } else {
        this._snackBar.open(error.error.message, '', {
          duration: 2000
        });
        }
        this.dialogRef.close();
        // this.threeDService.hide();
    });
  }
}
