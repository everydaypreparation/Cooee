import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  displayedColumns: string[] = ['Sno', 'virtualNumber', 'didassign','action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  isConnected:boolean=false;  
  noInternetConnection: boolean;  
  constructor(private router: Router, public dialog: MatDialog, private userService: UserService, 
    private _snackBar: MatSnackBar ) { 
    }

  ngOnInit(): void {
    this.getAllDID();

  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
 
  getAllDID() {
    // this.threeDService.show();
    this.userService.getAllDID().subscribe(res => {
      if (res.status == 200) {
        // this.threeDService.hide();
        this.dataSource.data = res.data;
        this.dataSource.paginator = this.paginator;
      }
      else {
        this._snackBar.open(res.message);
      }
    },
      error => {
        // this.threeDService.hide();
        if (error.status == 400) {
          this._snackBar.open(error.error.message);
        }
        else {
          this._snackBar.open(error.error.message);

        }
      })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      let matchFound = false;
      for (let column of this.displayedColumns) {
        if (column in data) {
          if (data[column]) {
            matchFound = (matchFound || data[column].toString().trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1)
          }
        }
      }
      return matchFound;

    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

 

}
