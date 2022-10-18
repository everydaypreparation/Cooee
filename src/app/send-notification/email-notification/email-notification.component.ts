import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-email-notification',
  templateUrl: './email-notification.component.html',
  styleUrls: ['./email-notification.component.scss']
})
export class EmailNotificationComponent implements OnInit {

  totalCal: any
  emailNotifi: [] = [];
  filterData
  selection: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource(this.emailNotifi);
  resultsLength: number = 0;
  selectedValue = '';
  networkStatus: boolean = false;
  constructor(private router: Router, private userService: UserService,private _snackBar: MatSnackBar ) {
    this.selection = { pageNo: 0, pageSize: 10, keyword: "" }
  }

  ngOnInit(): void {
    this.getAllUsers();

  }

  displayedColumns: string[] = ['sno', 'select',];
  selections = new SelectionModel(true, []);
  getPaginatorData($event) {
    this.selection.pageSize = $event.pageSize;
    this.selection.pageNo = $event.pageIndex;
    this.getAllUsers();
  }
  getAllUsers() {
    // this.threeDService.show();
    let data = {
      "keyword": this.selectedValue,
      "pageNo": this.selection.pageNo,
      "pageSize": this.selection.pageSize,
      "search": this.selection.keyword
    }
    this.userService.getAllUsers(data).subscribe(res => {
      if (res.status == 200) {
        this.dataSource.data = res.data.user;
        this.resultsLength = res.data.totalRecord;
        this.paginator.pageIndex = this.selection.pageNo;
        // this.threeDService.hide();
        if (this.resultsLength == 0) {
          this._snackBar.open("User Not Found", '', {
            duration: 2000
          });
        }
      }
      else {
        this.paginator.firstPage();
        this._snackBar.open(res.message, '', {
          duration: 2000
        });
      }
    },
      error => {
        // this.threeDService.hide();
        if (error.status == 400) {
          this._snackBar.open(error.error.message, '', {
            duration: 2000
          });
        } else {
          this._snackBar.open(error.error.message, '', {
            duration: 2000
          });
          }
          // this.threeDService.hide();
      })
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selections.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleSelectionAll(): void {
    this.isAllSelected() ?
    this.selections.clear() :
    this.dataSource.data.forEach(row => this.selections.select(row));
    this.computeTotal();
  }

  toggleSelection(row): void {
    this.selections.toggle(row);
    this.computeTotal();
  }

  computeTotal(): void {
    this.totalCal = this.dataSource.data
      .filter(e => this.selections.isSelected(e))
    console.log(this.totalCal)
  }
  next() {
    localStorage.setItem("totalRecord", JSON.stringify(this.totalCal));
    console.log((localStorage.getItem("totalRecord")), "Jaiswal")
    console.log(this.totalCal, "aaa")
    if (this.totalCal == undefined) {
      this._snackBar.open("Please select email", '', {
        duration: 2000
      });
    }
    else {
      this.router.navigate(['email-send']);
    }
  }
}
