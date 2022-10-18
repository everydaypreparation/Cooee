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
  selector: 'app-support-content-email',
  templateUrl: './support-content-email.component.html',
  styleUrls: ['./support-content-email.component.scss']
})
export class SupportContentEmailComponent implements OnInit {

  submitted = false;
  supportemailForm: FormGroup;
  networkStatus: boolean = false;

  constructor(private router: Router, public dialogRef: MatDialogRef<UserDetailsComponent>
    , @Inject(MAT_DIALOG_DATA) public confirmBoxData, public fb: FormBuilder,
    private _snackBar: MatSnackBar, private userService: UserService, private threeDService: ThreeDServiceService,) {
    this.supportemailForm = this.fb.group({
      email: [confirmBoxData.email],
      title: [confirmBoxData.description],
      description: ['',  [Validators.required,  this.noWhitespaceValidator(),removeSpaces]],
      ticketId: [confirmBoxData.ticketId],
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
  get f() { return this.supportemailForm.controls; }

  submit() {
    this.submitted = true;
    if (this.supportemailForm.invalid) {
      return;
    }
    this.threeDService.show();
    this.userService.addSupportcontentEmail(this.supportemailForm.value).subscribe(res => {
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
        this.router.navigate(['/support-ticket']);

      }
    }, error => {
      this.threeDService.hide();
      if (error.status == 400) {
        this._snackBar.open(error.error.message, '', {
          duration: 2000
        });
        this.dialogRef.close();
        this.threeDService.hide();
        this.router.navigate(['/support-ticket']);

      } else {
        this._snackBar.open(error.error.message, '', {
          duration: 2000
        });
        }
        this.dialogRef.close();
        this.router.navigate(['/support-ticket']);

        this.threeDService.hide();
    });
  }

}
