import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { UserRefundApproveComponent } from 'src/app/user-refund-approve/user-refund-approve.component';
import { UserRefundRejectComponent } from 'src/app/user-refund-reject/user-refund-reject.component';

@Component({
  selector: 'app-user-refund',
  templateUrl: './user-refund.component.html',
  styleUrls: ['./user-refund.component.scss']
})
export class UserRefundComponent implements OnInit {

  displayedColumns: string[] = ['sno', 'username','email','transactiondate','amount','status','action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  networkStatus: boolean = false;
  constructor(private router: Router, private userService: UserService,public dialog: MatDialog,  private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getRefund();
  }
  getRefund() {
    // this.threeDService.show();
    this.userService.getRefund().subscribe(res => {
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
        this._snackBar.open("No Record Found", '', {
          duration: 2000
        });
        }
        // this.threeDService.hide();
    })
  }
  approve(refundId) {
    const dialogRef = this.dialog.open(UserRefundApproveComponent, {
      width: '400px',
      data: refundId
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
  reject(refundId) {
    const dialogRef = this.dialog.open(UserRefundRejectComponent, {
      maxWidth: '600px',
      width: '100%',
      data: refundId
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
