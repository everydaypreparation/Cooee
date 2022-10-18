import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ThreeDServiceService } from '../service/spinner.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-delete-subscription-plan',
  templateUrl: './delete-subscription-plan.component.html',
  styleUrls: ['./delete-subscription-plan.component.scss']
})
export class DeleteSubscriptionPlanComponent implements OnInit {

  id: any
  networkStatus: boolean = false;
  constructor(private router: Router, public dialogRef: MatDialogRef<DeleteSubscriptionPlanComponent>,
    @Inject(MAT_DIALOG_DATA) public confirmBoxData: any, public fb: FormBuilder,
    private userService: UserService, private threeDService: ThreeDServiceService,private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.id = this.confirmBoxData.id
  }
  closeDialog() {
    this.dialogRef.close();
  }

  submit() {
    let form = {
      id: this.confirmBoxData.id,
    }
    this.threeDService.show();
    this.userService.subscriptionplanDelete(form).subscribe(res => {
      if (res.status == 200) {
        this.threeDService.hide();
        this.dialogRef.close();
        this._snackBar.open(res.message, '', {
          duration: 2000
        });
      }
      else {
        this._snackBar.open(res.message, '', {
          duration: 2000
        });
      }
    }, 
    error => {
      this.threeDService.hide();
      if (error.status == 400) {
        this.dialogRef.close();
        this._snackBar.open(error.error.message, '', {
          duration: 2000
        });
      } else {
        this._snackBar.open(error.error.message, '', {
          duration: 2000
        });
        }
        this.dialogRef.close();
      this.threeDService.hide();
    });
  }
  
}
