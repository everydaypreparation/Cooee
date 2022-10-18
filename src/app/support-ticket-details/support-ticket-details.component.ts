import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { SupportContentEmailComponent } from '../support-content-email/support-content-email.component';
import { SupportContentTicketCloseComponent } from '../support-content-ticket-close/support-content-ticket-close.component';

@Component({
  selector: 'app-support-ticket-details',
  templateUrl: './support-ticket-details.component.html',
  styleUrls: ['./support-ticket-details.component.scss']
})
export class SupportTicketDetailsComponent implements OnInit {

  supportDetailForm!: FormGroup;
  idCardFront: any
  idCardSelfie: any
  isPorting: any
  id: any;
  networkStatus: boolean = false;
  allRecord: any
  allRecords
  status: any;
  constructor(private router: Router, public dialog: MatDialog,
    private userService: UserService, public fb: FormBuilder, private route: ActivatedRoute,
  ) {
    this.allRecord = localStorage.getItem("supportContentData");
    this.allRecords = JSON.parse(this.allRecord);
    this.status=this.allRecords.status;
    this.supportDetailForm = this.fb.group({
      ticketId: [this.allRecords.ticketId],
      cooeeId: [this.allRecords.cooeeId],
      userName: [this.allRecords.userName],
      type: [this.allRecords.type],
      description: [this.allRecords.description],
      date: [],
      status: [],

    });
    if (this.allRecords.status == false) {
      this.supportDetailForm.patchValue({
        status: "Closed",
      });
    }
    else {
      this.supportDetailForm.patchValue({
        status: "Open",
      });
    }
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get('id');
  }
  goBack() {
    this.router.navigate(['support-ticket']);
  }
  get f() { return this.supportDetailForm.controls; }

  replyEmail() {
    const dialogRef = this.dialog.open(SupportContentEmailComponent, {
      width: '700px',
      data: this.allRecords
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.getAllUsers();
      console.log(result);
    });

    // console.log(userId)
    // localStorage.setItem("userId", userId)
    // sessionStorage.setItem("selection", JSON.stringify(this.selection));
    // this.router.navigate(['admin/update-active-user']);
  }


  closeTicket() {
    const dialogRef = this.dialog.open(SupportContentTicketCloseComponent, {
      maxWidth: '600px',
      width: '100%',
      data: this.allRecords
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.getAllUsers();
      console.log(result);
    });

    // console.log(userId)
    // localStorage.setItem("userId", userId)
    // sessionStorage.setItem("selection", JSON.stringify(this.selection));
    // this.router.navigate(['admin/update-active-user']);
  }

}