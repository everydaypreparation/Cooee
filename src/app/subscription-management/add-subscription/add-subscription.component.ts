import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ThreeDServiceService } from 'src/app/service/spinner.service';
import { UserService } from 'src/app/service/user.service';
import { removeSpaces } from 'src/app/shared/must-match.validator';

export interface Plan {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-subscription',
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.scss']
})
export class AddSubscriptionComponent implements OnInit {

  submitted = false;
  addsubscriptionForm: FormGroup;
  allCountry
  selectedItem = 'AU';
  networkStatus: boolean = false;
  plans: Plan[] = [
    { value: '30 day', viewValue: '1 Month' },
    { value: '60 day', viewValue: '2 Month' },
    { value: '90 day', viewValue: '3 Month' },
    { value: '120 day', viewValue: '4 Month' },
    { value: '150 day', viewValue: '5 Month' },
    { value: '180 day', viewValue: '6 Month' },
    { value: '210 day', viewValue: '7 Month' },
    { value: '240 day', viewValue: '8 Month' },
    { value: '270 day', viewValue: '9 Month' },
    { value: '300 day', viewValue: '10 Month' },
    { value: '330 day', viewValue: '11 Month' },
    { value: '360 day', viewValue: '12 Month' },

  ];
  constructor(private router: Router, public fb: FormBuilder, private userService: UserService, private threeDService: ThreeDServiceService, private _snackBar: MatSnackBar) {
    this.addsubscriptionForm = this.fb.group({
      country: ['',],
      planValidity: ['', Validators.required],
      incomingSms: ['', Validators.required],
      incomingCall: ['', Validators.required],
      outgoingSms: ['', Validators.required],
      outgoingCall: ['', Validators.required],
      discount: [],
      amount: ['', Validators.required],
      title: ['', [Validators.required,  this.noWhitespaceValidator(),removeSpaces]],
      outgoingcalls: [''],
      outgoingsmss: [''],
      incomingsmss: ['',],
      incomingcalls: ['',],
      description: new FormArray([]),
    });
  }

  ngOnInit(): void {
    this.getAllCountry();
    this.addUser();
    
  }

  addUser() {
    // const add = this.addsubscriptionForm.get('description') as FormArray;
    // add.push(new FormControl(''));
    const control = new FormControl(null, [Validators.required]);
    (<FormArray>this.addsubscriptionForm.get('description')).push(control);
  }

  removeUser(i) {
    const remove = this.addsubscriptionForm.get('description') as FormArray;
    remove.removeAt(i);

  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  get f() {
    return this.addsubscriptionForm
      .controls;
  }

  // change() {
  //   if (this.addsubscriptionForm.value.outgoingCall != 'Unlimited') {
  //     this.addsubscriptionForm.get('outgoingcalls').setValidators(Validators.required)
  //   } else {
  //     this.addsubscriptionForm.get('outgoingcalls').clearValidators();
  //   }
  //   if (this.addsubscriptionForm.value.outgoingSms != 'Unlimited') {
  //     this.addsubscriptionForm.get('outgoingsmss').setValidators(Validators.required)
  //   } else {
  //     this.addsubscriptionForm.get('outgoingsmss').clearValidators();
  //   }
  // }
//   change1() {
//   if (this.addsubscriptionForm.value.outgoingSms != 'Unlimited') {
//     this.addsubscriptionForm.get('outgoingsmss').setValidators(Validators.required)
//   } else {
//     this.addsubscriptionForm.get('outgoingsmss').clearValidators();
//   }
// }

  getAllCountry() {
    this.threeDService.show();
    this.userService.getAllCountry().subscribe(res => {
      if (res.status == 200) {
        this.allCountry = res.data;
        this.threeDService.hide();
      }
      else {
        this._snackBar.open(res.message, '', {
          duration: 2000
        });
      }
    }, error => {
      if (error.status == 400) {
        this._snackBar.open(error.error.message, '', {
          duration: 2000
        });
        this.threeDService.hide();
      } else {
        this._snackBar.open(error.error.message, '', {
          duration: 2000
        });
      }
      this.threeDService.hide();

    });
  }
  noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isWhitespace = (control.value || '').trim().length === 0;
      return isWhitespace ? { whitespace: true } : null;
    };
  }
  decimalFilter(event: any) {
    const reg = /^-?\d*(\.\d{0,2})?$/;
    let input = event.target.value + String.fromCharCode(event.charCode);
 
    if (!reg.test(input)) {
        event.preventDefault();
    }
 }
  check() {
  }
  submit() {
    if(this.addsubscriptionForm.value.discount==null){
      this.addsubscriptionForm.value.discount=0
    }
   
    console.log(this.addsubscriptionForm.value.outgoingCall);
    console.log(this.addsubscriptionForm);
    // if (this.addsubscriptionForm.value.outgoingCall="No.of Minutes"  ) {
    //       this.addsubscriptionForm.get('outgoingcalls').setValidators(Validators.required)

    //     } else {
    //       this.addsubscriptionForm.get('outgoingcalls').clearValidators();

    //     }
    //     if (this.addsubscriptionForm.value.outgoingSms="No.of Units" ) {
    //       this.addsubscriptionForm.get('outgoingsmss').setValidators(Validators.required)

    //     } else {
    //       this.addsubscriptionForm.get('outgoingsmss').clearValidators();

    //     }
      
   
    this.submitted = true;
    if (this.addsubscriptionForm.invalid) {
      return;        
    }
    console.log(this.addsubscriptionForm);

    // if (this.addsubscriptionForm.invalid) {
    //   if (this.addsubscriptionForm.value.outgoingSms != 'Unlimited'  ) {
    //   }
    //   return;        

    // }
    // if (this.addsubscriptionForm.value.descriptions=""){
    //   this.toastr.error("Please Enter Description")
    //  this.submitted = false;
    //  return;    
    //  }
     
    if (this.addsubscriptionForm.value.outgoingSms == "No.of Units") {
      this.addsubscriptionForm.value.outgoingSms = this.addsubscriptionForm.value.outgoingsmss
    } else {
      this.addsubscriptionForm.value.outgoingSms = "Unlimited"
    }

    if (this.addsubscriptionForm.value.incomingCall == "No.of Minutes") {
      this.addsubscriptionForm.value.incomingCall = this.addsubscriptionForm.value.incomingcalls
    } else {
      this.addsubscriptionForm.value.incomingCall = "Unlimited"
    }

    if (this.addsubscriptionForm.value.incomingSms == "No.of Units") {
      this.addsubscriptionForm.value.incomingSms = this.addsubscriptionForm.value.incomingsmss
    } else {
      this.addsubscriptionForm.value.incomingSms = "Unlimited"
    }


    if (this.addsubscriptionForm.value.outgoingCall == "No.of Minutes") {
      this.addsubscriptionForm.value.outgoingCall = this.addsubscriptionForm.value.outgoingcalls
    } else {
      this.addsubscriptionForm.value.outgoingCall = "Unlimited"

    }

    delete this.addsubscriptionForm.value.outgoingsmss;
    delete this.addsubscriptionForm.value.incomingcalls;
    delete this.addsubscriptionForm.value.incomingsmss;
    delete this.addsubscriptionForm.value.outgoingcalls;
    // if(this.addsubscriptionForm.value.descriptions==null){
    //   this.toastr.error("Please Fill Description");
    // }
    // else{
      this.threeDService.show();
      this.userService.addSubscriptionPlan(this.addsubscriptionForm
        .value).subscribe(res => {
          if (res.status == 200) {
            this._snackBar.open(res.message, '', {
              duration: 2000
            });
            this.threeDService.hide();
            this.router.navigate(['subscription/view-subscription']);
          }
          else {
            this._snackBar.open(res.message, '', {
              duration: 2000
            });
            this.addsubscriptionForm.reset()
          }
        }, error => {
          this.threeDService.hide();
          if (error.status == 400) {
            this._snackBar.open(error.error.message, '', {
              duration: 2000
            });
          } else {
            this._snackBar.open(error.error.message, '', {
              duration: 2000
            });
          }
        });
    // }

  


  }
}
