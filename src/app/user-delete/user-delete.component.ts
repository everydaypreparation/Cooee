import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent implements OnInit {

  email: any
  networkStatus: boolean = false;
  constructor(private router: Router, public dialogRef: MatDialogRef<UserDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public confirmBoxData: any, public fb: FormBuilder,private _snackBar: MatSnackBar,
    private userService: UserService, ) {
  }

  ngOnInit(): void {
    console.log(this.confirmBoxData.userId, "id")
    console.log(this.confirmBoxData, "id")
    this.email = this.confirmBoxData.emailId
  }
  closeDialog() {
    this.dialogRef.close();
  }

  submit() {
    let form = {
      id: this.confirmBoxData.userId,
    }
    // this.threeDService.show();
    this.userService.userDelete(form).subscribe(res => {
      if (res.status == 200) {
        // this.threeDService.hide();
        this._snackBar.open(res.message, '', {
          duration: 2000
        });
        this.dialogRef.close();
        this.router.navigate(['usermanagement']);
      }
      else {
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
