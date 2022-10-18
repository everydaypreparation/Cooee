import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ThreeDServiceService } from 'src/app/service/spinner.service';
import { UserService } from 'src/app/service/user.service';
import { removeSpaces } from 'src/app/shared/must-match.validator';
import { UserDetailsComponent } from '../user-details/user-details.component';
export interface Country {
  value: string;
  viewValue: string;
}
export interface State {
  country: string;
  value: string;
  viewValue: string;
}
export interface Language {
  state: string;
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-vnm',
  templateUrl: './add-vnm.component.html',
  styleUrls: ['./add-vnm.component.scss']
})
export class AddVnmComponent implements OnInit {

  submitted = false;
  addvnmForm: FormGroup;
  networkStatus: boolean = false;
  selCountry;
  selState;
  selCity;
  selectedValue = 'AU';
  countries: any[] = [{ value: 'AU', viewValue: 'Australia'  }];
  states: State[] = [
    { country: 'AU', value: 'KL', viewValue: 'Australian Capital Territory' },
    { country: 'AU', value: 'NS', viewValue: 'New South Wales' },
    { country: 'AU', value: 'NT', viewValue: 'Northern Territory' },
    { country: 'AU', value: 'QL', viewValue: 'Queensland' },
    { country: 'AU', value: 'SA', viewValue: 'South Australia' },
    { country: 'AU', value: 'TA', viewValue: 'Tasmania' },
    { country: 'AU', value: 'VI', viewValue: 'Victoria' },
    { country: 'AU', value: 'WA', viewValue: 'Western Australia' },
  ];
  languages: Language[] = [
    { state: 'KL', value: 'KN', viewValue: 'Capital' },
    { state: 'NS', value: 'QL', viewValue: 'Sydney' },
    { state: 'NS', value: 'QL', viewValue: 'Albury' },

  ];
  constructor(private router: Router, public dialogRef: MatDialogRef<UserDetailsComponent>
    , public fb: FormBuilder, private userService: UserService,  private threeDService: ThreeDServiceService,
    private _snackBar: MatSnackBar) {
    this.addvnmForm = this.fb.group({
      didNumber: ['61', [Validators.required,Validators.minLength(11),removeSpaces]],
      country: [''],
      // selState: ['',Validators.required],
      // selCity: ['',Validators.required],
    });
  }

  ngOnInit(): void {

  }
  goBack() {
    this.router.navigate(['admin/userdetails']);
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  getStates() {
    return this.states.filter(item => {
      return item.country == this.selCountry;
    });
  }
  getLanguages() {
    return this.languages.filter(item => {
      return item.state == this.selState;
    });
  }
  closeDialog() {
    this.dialogRef.close();
  }
  get f() { return this.addvnmForm.controls; }

  submit() {
    this.submitted = true;
    if (this.addvnmForm.invalid) {
      return;
    }
    console.log(this.addvnmForm.value);
    
    this.threeDService.show();
    this.userService.addDIDNumber(this.addvnmForm.value).subscribe(res => {
      if (res.status == 200) {
        this.threeDService.hide();
        this._snackBar.open(res.message, '', {
          duration: 2000
        });
        this.dialogRef.close();
      }
      else {
        this._snackBar.open(res.message, '', {
          duration: 2000
        });
        this.dialogRef.close();
        this.threeDService.hide();
      }
    }, error => {
      this.threeDService.hide();
      if (error.status == 400) {
        this._snackBar.open(error.error.message, '', {
          duration: 2000
        });
      this.dialogRef.close();
      this.threeDService.hide();
      
      } else {
        this._snackBar.open(error.error.message, '', {
          duration: 2000
        });
        this.dialogRef.close();
        this.threeDService.hide();
      }
    });
  }

}
