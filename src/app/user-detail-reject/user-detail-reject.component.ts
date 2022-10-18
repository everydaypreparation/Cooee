import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { UserDetailsComponent } from '../user-details/user-details.component';

@Component({
  selector: 'app-user-detail-reject',
  templateUrl: './user-detail-reject.component.html',
  styleUrls: ['./user-detail-reject.component.scss']
})
export class UserDetailRejectComponent implements OnInit {

  submitted = false;
  returnUrl: string;
  error = '';
  userRejectForm: FormGroup;
  networkStatus: boolean = false;
  constructor(private router: Router, public dialogRef: MatDialogRef<UserDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public rejectUserId: any, public fb: FormBuilder,private _snackBar: MatSnackBar,
    private descriptionservice: UserService) {
    this.userRejectForm = this.fb.group({
      userId: [rejectUserId],
      descriptions: new FormArray([]),
    });
  }

  ngOnInit(): void {
    console.log(this.rejectUserId)
    this.addUser();
  }

  addUser() {
    // const add = this.userRejectForm.get('descriptions') as FormArray;
    // add.push(new FormControl(''));
    const control = new FormControl(null, [Validators.required]);
    (<FormArray>this.userRejectForm.get('descriptions')).push(control);
  }

  removeUser(i) {
    const remove = this.userRejectForm.get('descriptions') as FormArray;
    remove.removeAt(i);

  }
  
  goBack() {
    this.router.navigate(['userdetails']);
  }
  closeDialog() {
    this.dialogRef.close();
  }
  get f() { return this.userRejectForm.controls; }

  submit() {
    this.submitted = true;
    if (this.userRejectForm.invalid) {
      return;
    }
    // this.threeDService.show();
    this.descriptionservice.rejectKyc(this.userRejectForm.value).subscribe(res => {
      // this.threeDService.hide();
      if (res.status == 200) {
        this._snackBar.open(res.message, '', {
          duration: 2000
        });
        this.dialogRef.close();
        this.router.navigate(['usermanagement']);
      }
    });

    error => {
      // this.threeDService.hide();
      if (error.status == 400) {
        this._snackBar.open(error.error.message, '', {
          duration: 2000
        });
        this.closeDialog()
      } else {
        this._snackBar.open(error.error.message, '', {
          duration: 2000
        });
        }
        this.closeDialog()
        // this.threeDService.hide();

      }
  }
}
