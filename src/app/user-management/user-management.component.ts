import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ThreeDServiceService } from '../service/spinner.service';
import { UserService } from '../service/user.service';
import { UserDeleteComponent } from '../user-delete/user-delete.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  displayedColumns: string[] = ['sno', 'cooeeid', 'name', 'email', 'did', 'status', 'action', 'delete', 'view'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  allDID: [] = [];
  filterData
  selection: any;
  dataSource = new MatTableDataSource(this.allDID);
  resultsLength: number = 0;
  selectedValue = '';
  networkStatus: boolean = false;
  userTypeData: any[] = [{ id: '', value: "All" }, { id: 0, value: "N/A" }, { id: 1, value: "Pending" }, { id: 2, value: "Approved" }, { id: 3, value: "Reject" }];
  constructor(private router: Router, private _snackBar: MatSnackBar, private userService: UserService, private threeDService: ThreeDServiceService, public dialog: MatDialog) {
    this.selection = { pageNo: 0, pageSize: 10, keyword: "" }

  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  applyFilter(filterValue: string) {
    this.paginator.firstPage();
    this.selection.keyword = filterValue;
    this.getAllUsers();

  }
  kycStatusChange() {
    this.getAllUsers();
  }
  getPaginatorData($event) {
    this.selection.pageSize = $event.pageSize;
    this.selection.pageNo = $event.pageIndex;
    this.getAllUsers();
  }

  getAllUsers() {
    let data = {
      "keyword": this.selectedValue,
      "pageNo": this.selection.pageNo,
      "pageSize": this.selection.pageSize,
      "search": this.selection.keyword
    }
    this.userService.getAllUsers(data).subscribe(res => {
      if (res.status == 200) {
        this.dataSource.data = res.data.user;
        this.paginator.pageIndex = this.selection.pageNo;
        this.resultsLength = res.data.totalRecord;
        if (this.resultsLength == 0) {
          // this.toastr.error()
          this._snackBar.open("User Not Found", '', {
            duration: 2000
          });
        }
        this.threeDService.hide();

        console.log(this.resultsLength)
      }
      else {
        this.paginator.firstPage();
        this._snackBar.open(res.error.message, '', {
          duration: 2000
        });
      }
    },
      error => {
        this.threeDService.hide();
        if (error.status == 400) {
          this._snackBar.open(error.error.message, '', {
            duration: 2000
          });
        }
        // else if(error.status == 404)
        // {
        //   this.toastr.error("Please connect to server")
        // }
        else {
          this._snackBar.open(error.error.message, '', {
            duration: 2000
          });
        
        }
      })
  }
  userDetails(id: any) {
    this.router.navigate(['/userdetails'], { queryParams: { id: id } });
  }
  viewSubscriptionplan(id: any) {
    this.router.navigate(['/user-view-subscription'], { queryParams: { id: id } });
  }
   userDelete(id: any, email: any) {
    const dialogRef = this.dialog.open(UserDeleteComponent, {
      maxWidth: '400px',
      width: '100%',
      data: { userId: id, emailId: email },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllUsers();
    });

    // console.log(userId)
    // localStorage.setItem("userId", userId)
    // sessionStorage.setItem("selection", JSON.stringify(this.selection));
    // this.router.navigate(['admin/update-active-user']);
  }
}
