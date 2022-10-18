import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { UserDetailApproveComponent } from 'src/app/user-detail-approve/user-detail-approve.component';
import { UserDetailRejectComponent } from 'src/app/user-detail-reject/user-detail-reject.component';
import { UserRefundApproveComponent } from 'src/app/user-refund-approve/user-refund-approve.component';
import { UserRefundRejectComponent } from 'src/app/user-refund-reject/user-refund-reject.component';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {

  displayedColumns: string[] = ['sno', 'username','transactiondate','amount','status'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  networkStatus: boolean = false;
  constructor(private router: Router, public dialog: MatDialog,  private userService: UserService, private _snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    this.getAllTransaction();
  }
  getAllTransaction() {
    // this.threeDService.show();
    this.userService.getAllTransaction().subscribe(res => {
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

}
