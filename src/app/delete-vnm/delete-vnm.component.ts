import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-delete-vnm',
  templateUrl: './delete-vnm.component.html',
  styleUrls: ['./delete-vnm.component.scss']
})
export class DeleteVnmComponent implements OnInit {

  id: any
  networkStatus: boolean = false;
  virtualNumber: any;
  constructor(private router: Router, public dialogRef: MatDialogRef<DeleteVnmComponent>,
    @Inject(MAT_DIALOG_DATA) public confirmBoxData: any, public fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private userService: UserService) {
  }

  ngOnInit(): void {
    console.log(this.confirmBoxData.virtualNumber);
    this.id = this.confirmBoxData.id;
    this.virtualNumber = this.confirmBoxData.virtualNumber
  }
  closeDialog() {
    this.dialogRef.close();
  }

  submit() {
    let form = {
      id: this.confirmBoxData.id,
    }
    console.log(form);
    
    // this.threeDService.show();
    this.userService.virtualNumberDelete(form).subscribe(res => {
      if (res.status == 200) {
        // this.threeDService.hide();
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
      // this.threeDService.hide();
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
      // this.threeDService.hide();
    });
  }
  
}