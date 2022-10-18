import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteVnmComponent } from 'src/app/delete-vnm/delete-vnm.component';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-available-virtual-list',
  templateUrl: './available-virtual-list.component.html',
  styleUrls: ['./available-virtual-list.component.scss']
})
export class AvailableVirtualListComponent implements OnInit {

  displayedColumns: string[] = ['sno', 'virtualNumber', 'didassign','action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  allAvailbleDID: [] = [];
  networkStatus: boolean = false;
  dataSource = new MatTableDataSource(this.allAvailbleDID);
  constructor(private router: Router, public dialog: MatDialog, private userService: UserService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAvailableDID();
  }
  getAvailableDID() {
    // this.threeDService.show();
    this.userService.getAvailableDID().subscribe(res => {
      if (res.status == 200) {
        this.allAvailbleDID = res.data
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
      } else {
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      console.log(data, 'data');
      console.log(filter);
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
  vnmDelete(id: any, virtualNumber: any) {
    const dialogRef = this.dialog.open(DeleteVnmComponent, {
      width: '400px',
      data: { id: id, virtualNumber: virtualNumber },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAvailableDID();
      console.log(result);
    });
  }
}
