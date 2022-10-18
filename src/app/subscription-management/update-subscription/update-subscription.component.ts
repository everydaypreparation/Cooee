import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ThreeDServiceService } from 'src/app/service/spinner.service';
import { UserService } from 'src/app/service/user.service';
import { removeSpaces } from 'src/app/shared/must-match.validator';
export interface Plan {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-update-subscription',
  templateUrl: './update-subscription.component.html',
  styleUrls: ['./update-subscription.component.scss']
})
export class UpdateSubscriptionComponent implements OnInit {

  submitted = false;
  addsubscriptionForm: FormGroup;
  allCountry
  selectedItem = 'AU';
  planId: any;
  cmrks: any;
  subscriptionPlanDescription: FormArray;
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
  type: any;

  constructor(private router: Router, public fb: FormBuilder,
    private userService: UserService,
    private threeDService: ThreeDServiceService, public route: ActivatedRoute,private _snackBar: MatSnackBar) {
    this.addsubscriptionForm = this.fb.group({
      id: ['',],
      status: ['',],
      country: ['',],
      title: ['', [Validators.required,  this.noWhitespaceValidator(),removeSpaces]],
      planValidity: ['', Validators.required],
      incomingSms: ['', Validators.required],
      incomingCall: ['', Validators.required],
      outgoingSms: ['', Validators.required],
      outgoingCall: ['', Validators.required],
      discount: [],
      amount: ['', Validators.required],
      outgoingcalls: ['',],
      outgoingsmss: ['',],
      incomingsmss: ['',],
      incomingcalls: ['',],
      subscriptionPlanDescription: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.planId = params['id'];
      console.log(this.planId);
    });
    this.getAllCountry();
    this.getSubscriptionPlanDetails();

  }
  createItem() {
    return this.fb.group({
      id: [''],
      description: [''],

    });
  }

  addItem() {
    this.subscriptionPlanDescription = this.f['subscriptionPlanDescription'] as FormArray;
    this.subscriptionPlanDescription.push(this.createItem());
  }
  removeItem(idx: number): void {
    (this.f['subscriptionPlanDescription'] as FormArray).removeAt(idx);
  }
  get getCSubjectRes() {
    return this.addsubscriptionForm.get('subscriptionPlanDescription') as FormArray;
  }

  goBack() {
    this.router.navigate(['subscription/view-subscription']);
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
  get f() {
    return this.addsubscriptionForm.controls;
  }

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
  genSubRec() {
    return this.fb.group({
      id: [''],
      description: [''],

    })
  }

  getSubscriptionPlanDetails() {
    this.threeDService.show();
    let form = {
      id: this.planId
    }
    this.userService.getSubscriptionplanDetailsById(form).subscribe(res => {
      if (res.status == 200) {
        this.cmrks = res.data.subscriptionPlanDescription
        this.cmrks.forEach(e => {
          e.description = e.description;
          e.id = e.id;
          this.getCSubjectRes.push(this.genSubRec())
        });
        this.addsubscriptionForm.patchValue({
          subscriptionPlanDescription: this.cmrks
        })
        if (res.data.incomingCall != "Unlimited") {
          this.addsubscriptionForm.patchValue({
            incomingcalls: res.data.incomingCall,
          });
          res.data.incomingCall ="limited";
        }

        if (res.data.outgoingCall != "Unlimited") {
          this.addsubscriptionForm.patchValue({
            outgoingcalls: res.data.outgoingCall,
          });
          res.data.outgoingCall ="limited";


        }
        if (res.data.outgoingSms != "Unlimited") {
          this.addsubscriptionForm.patchValue({
            outgoingsmss: res.data.outgoingSms,
          });
          res.data.outgoingSms ="limited";


        }
        if (res.data.incomingSms != "Unlimited") {
          this.addsubscriptionForm.patchValue({
            incomingsmss: res.data.incomingSms,
          });
          res.data.incomingSms ="limited";

        }
        this.addsubscriptionForm.patchValue({
          country: res.data.country,
          planValidity: res.data.planValidity,
          incomingSms: res.data.incomingSms,
          outgoingSms: res.data.outgoingSms,
          outgoingCall: res.data.outgoingCall,
          incomingCall: res.data.incomingCall,
          discount: res.data.discount,
          amount: res.data.amount,
          id: res.data.id,
          status: res.data.status,
          title:res.data.title

        });

        this.threeDService.hide();
      } else {
        this._snackBar.open(res.message, '', {
          duration: 2000
        });
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
        this.threeDService.hide();
    })
  }
  decimalFilter(event: any) {
    const reg = /^-?\d*(\.\d{0,2})?$/;
    let input = event.target.value + String.fromCharCode(event.charCode);
 
    if (!reg.test(input)) {
        event.preventDefault();
    }
 }
  submit() {
    this.submitted = true;
    if (this.addsubscriptionForm
      .invalid) {
       
      return;
    }
    for (let i = 0; i < this.addsubscriptionForm.value.subscriptionPlanDescription.length; i++) {
      if(this.addsubscriptionForm.value.subscriptionPlanDescription[i].description=="" ){
           this._snackBar.open("Please Fill Description");
           return
         }
      console.log(this.addsubscriptionForm.value.subscriptionPlanDescription[i]);
    }
    // if(this.addsubscriptionForm.value.subscriptionPlanDescription[0].description=="" ){
    //   this._snackBar.open("Please Fill Description");
    // }
    // else{
      if(this.addsubscriptionForm.value.discount==null){
        this.addsubscriptionForm.value.discount=0
      }
      if (this.addsubscriptionForm.value.outgoingSms != "Unlimited") {
        this.addsubscriptionForm.value.outgoingSms = this.addsubscriptionForm.value.outgoingsmss
      } else {
        this.addsubscriptionForm.value.outgoingSms = "Unlimited"
      }
  
      if (this.addsubscriptionForm.value.incomingCall != "Unlimited") {
        this.addsubscriptionForm.value.incomingCall = this.addsubscriptionForm.value.incomingcalls
      } else {
        this.addsubscriptionForm.value.incomingCall = "Unlimited"
      }
  
      if (this.addsubscriptionForm.value.incomingSms != "Unlimited") {
        this.addsubscriptionForm.value.incomingSms = this.addsubscriptionForm.value.incomingsmss
      } else {
        this.addsubscriptionForm.value.incomingSms = "Unlimited"
      }
  
      if (this.addsubscriptionForm.value.outgoingCall != "Unlimited") {
        this.addsubscriptionForm.value.outgoingCall = this.addsubscriptionForm.value.outgoingcalls
      } else {
        this.addsubscriptionForm.value.outgoingCall = "Unlimited"
      }
  
      delete this.addsubscriptionForm.value.outgoingsmss;
      delete this.addsubscriptionForm.value.incomingcalls;
      delete this.addsubscriptionForm.value.incomingsmss;
      delete this.addsubscriptionForm.value.outgoingcalls;
      if (this.addsubscriptionForm.value.outgoingcalls=""){
        
      }
      console.log(this.addsubscriptionForm.value)
      this.threeDService.show();
      this.userService.updateSubscriptionPlan(this.addsubscriptionForm
        .value).subscribe(res => {
          if (res.status == 200) {
            this.threeDService.hide();
            this._snackBar.open(res.message, '', {
              duration: 2000
            });
            this.router.navigate(['subscription/view-subscription']);
          }
          else {
            this._snackBar.open(res.message, '', {
              duration: 2000
            });
            this.threeDService.hide();
            this.router.navigate(['subscription/view-subscription']);
          }
        }, error => {
          this.threeDService.hide();
          if (error.status == 400) {
            this._snackBar.open(error.error.message, '', {
              duration: 2000
            });
            this.router.navigate(['subscription/view-subscription']);
          } else {
            this._snackBar.open(error.error.message, '', {
              duration: 2000
            });
            }
            this.router.navigate(['subscription/view-subscription']);
            this.threeDService.hide();
        });
    // }
 
  }
}
