import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddVnmComponent } from 'src/app/add-vnm/add-vnm.component';
import { AddVNMModule } from 'src/app/add-vnm/add-vnm.module';
import { DeleteVnmComponent } from 'src/app/delete-vnm/delete-vnm.component';

import { ThreeDServiceService } from 'src/app/service/spinner.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-virtual-list',
  templateUrl: './virtual-list.component.html',
  styleUrls: ['./virtual-list.component.scss']
})
export class VirtualListComponent implements OnInit {

  displayedColumns: string[] = ['Sno', 'virtualNumber', 'didassign','action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  isConnected:boolean=false;  
  noInternetConnection: boolean;  
  constructor(private router: Router, public dialog: MatDialog, private userService: UserService, private _snackBar: MatSnackBar
) { 
      // alert("1")
      // this.connectionService.monitor().subscribe(isConnected => {  
      //   alert("2")
      //   this.isConnected = isConnected;  
  
      //   if (this.isConnected==false) {  
      //     this.noInternetConnection=false;  
      //     alert("3")
      //     console.log(this.isConnected,"hyh");
          
      //     this.toastr.error("Please Check Your Internet Connection")
      //   }  
     
      // }) 

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
        }
        else {
          this._snackBar.open(error.error.message, '', {
            duration: 2000
          });
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

  addVNM() {
    const dialogRef = this.dialog.open(AddVnmComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllDID();
      console.log(result);
    });
  }
  vnmDelete(id: any, virtualNumber: any) {
    const dialogRef = this.dialog.open(DeleteVnmComponent, {
      width: '400px',
      data: { id: id, virtualNumber: virtualNumber },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllDID();
      console.log(result);
    });
  }
}
