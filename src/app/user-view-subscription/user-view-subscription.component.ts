import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-view-subscription',
  templateUrl: './user-view-subscription.component.html',
  styleUrls: ['./user-view-subscription.component.scss']
})
export class UserViewSubscriptionComponent implements OnInit {

  displayedColumns: string[] = ['sno', 'title','amount','planValidity','incomingCall','incomingSms','outgoingCall','outgoingSms','planStatus'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  networkStatus: boolean = false;
  id: any;
  constructor(private router: Router, public dialog: MatDialog, private userService: UserService
    , private route: ActivatedRoute,private _snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get('id');
    this.getUserSubscriptionData();
  }
  getUserSubscriptionData() {
    let data = {
      "userId": this.id,
    }
    // this.threeDService.show();
    this.userService.getUserSubscriptionData(data).subscribe(res => {
      if (res.status == 200) {
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

  goBack() {
    this.router.navigate(['usermanagement']);
  }

}
