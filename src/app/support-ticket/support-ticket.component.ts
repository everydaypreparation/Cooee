import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-support-ticket',
  templateUrl: './support-ticket.component.html',
  styleUrls: ['./support-ticket.component.scss']
})
export class SupportTicketComponent implements OnInit {

  displayedColumns: string[] = ['sno', 'ticketid', 'cooeeid', 'username','email', 'type', 'description', 'date', 'status', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  allSupoortList: [] = [];
  dataSource = new MatTableDataSource();
  networkStatus: boolean = false;
  
  constructor(private router: Router, public dialog: MatDialog, private userService: UserService,
    private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.getAllSupportContent();
  }
  getAllSupportContent() {
    // this.threeDService.show();
    this.userService.getAllSupportContent().subscribe(res => {
      if (res.status == 200) {
        this.allSupoortList = res.data
        // this.threeDService.hide();
        this.dataSource.data = res.data;
        this.dataSource.paginator = this.paginator;
      }

    }, error => {
      // this.threeDService.hide();
      if (error.status == 400) {
        this._snackBar.open(error.error.message, '', {
          duration: 2000
        });
      }
      else {
        this._snackBar.open(error.error.message, '', {
          duration: 2000
        });
        }
        // this.threeDService.hide();
    })
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  supportDetails(alldata) {
    localStorage.setItem("supportContentData", JSON.stringify(alldata));
    console.log((localStorage.getItem("alldata")), "supportContentData")
    this.router.navigate(['/support-ticket-details']);
  }

}
