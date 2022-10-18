import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DeleteSubscriptionPlanComponent } from 'src/app/delete-subscription-plan/delete-subscription-plan.component';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-view-subscription',
  templateUrl: './view-subscription.component.html',
  styleUrls: ['./view-subscription.component.scss']
})
export class ViewSubscriptionComponent implements OnInit {

  data: any[];
  toggle: boolean;
  networkStatus: boolean = false;
  constructor(private router: Router, private userService: UserService,public dialog: MatDialog
    ,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllSubscriptionplan()
  }
  
  update(id: any) {
    this.router.navigate(['subscription/update-subscription'], { queryParams: { id: id } });
  }

  getAllSubscriptionplan() {
    // this.threeDService.show();
    this.userService.getAllSubscriptionplan().subscribe(res => {
      if (res.status == 200) {
        this.data = res.data;
        // this.threeDService.hide();
      }
      else {
        this._snackBar.open(res.message, '', {
          duration: 2000
        });
        // this.threeDService.hide();

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

  changeToggle(status,id) {
    this.toggle=status
    let data = {
      "id": id,
      "status": this.toggle,

    }
    this.userService.changeSubscriptionplanByStatus(data).subscribe(res => {
      if (res.status == 200) {
        this._snackBar.open(res.message, '', {
          duration: 2000
        });
        this.getAllSubscriptionplan();
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
        } else {
          this._snackBar.open(error.error.message, '', {
            duration: 2000
          });
          }
        // this.threeDService.hide();
      })
  }
  delete(id: any) {
    const dialogRef = this.dialog.open(DeleteSubscriptionPlanComponent, {
      maxWidth: '400px',
      width: '100%',
      data: { id: id },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllSubscriptionplan();
      // this.threeDService.hide()
      console.log(result);
    });
    // this.threeDService.hide()

    // console.log(userId)
    // localStorage.setItem("userId", userId)
    // sessionStorage.setItem("selection", JSON.stringify(this.selection));
    // this.router.navigate(['admin/update-active-user']);
  }

}
