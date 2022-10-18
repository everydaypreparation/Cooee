import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ThreeDServiceService } from '../service/spinner.service';
import { UserService } from '../service/user.service';
import { removeSpaces } from '../shared/must-match.validator';
import { UserDetailsComponent } from '../user-details/user-details.component';

@Component({
  selector: 'app-support-content-ticket-close',
  templateUrl: './support-content-ticket-close.component.html',
  styleUrls: ['./support-content-ticket-close.component.scss']
})
export class SupportContentTicketCloseComponent implements OnInit {

  submitted = false;
  ticketcloseForm: FormGroup;
  networkStatus: boolean = false;

  constructor(private router: Router, public dialogRef: MatDialogRef<UserDetailsComponent>
    ,@Inject(MAT_DIALOG_DATA) public confirmBoxData, public fb: FormBuilder, private userService: UserService, private threeDService: ThreeDServiceService,private _snackBar: MatSnackBar,) {
      this.ticketcloseForm = this.fb.group({
      remark: ['',  [Validators.required,  this.noWhitespaceValidator(),removeSpaces]],
      ticketId: [confirmBoxData.ticketId],
      userId: [confirmBoxData.userId],
    });
  }

  ngOnInit(): void {

  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isWhitespace = (control.value || '').trim().length === 0;
      return isWhitespace ? { whitespace: true } : null;
    };
  }
  closeDialog() {
    this.dialogRef.close();
  }
  get f() { return this.ticketcloseForm.controls; }

  submit() {
    this.submitted = true;
    if (this.ticketcloseForm.invalid) {
      return;
    }
    this.threeDService.show();
    this.userService.addSupportcontentTicketClose(this.ticketcloseForm.value).subscribe(res => {
      if (res.status == 200) {
        this.threeDService.hide();
        this._snackBar.open(res.message, '', {
          duration: 2000
        });
        this.dialogRef.close();
        this.router.navigate(['support-ticket']);

      }
      else {
        this._snackBar.open(res.message, '', {
          duration: 2000
        });
        this.dialogRef.close();
        this.threeDService.hide();
        this.router.navigate(['support-ticket']);

      }
    }, error => {
      this.threeDService.hide();
      if (error.status == 400) {
        this._snackBar.open(error.error.message, '', {
          duration: 2000
        });
      this.dialogRef.close();
      this.threeDService.hide();
      this.router.navigate(['support-ticket']);
      
      } else {
        this._snackBar.open(error.error.message, '', {
          duration: 2000
        });
        }
        this.dialogRef.close();
        this.router.navigate(['support-ticket']);
        this.threeDService.hide();
    });
  }

}
