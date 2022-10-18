import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FAQComponent implements OnInit {

  isDoc: boolean | undefined;
  @ViewChild('inputFile',) docFile: any;
  fileuploadform: FormGroup = new FormGroup({});
  networkStatus: boolean = false;
  constructor(private userService: UserService, private router: Router,
    private formBuilder: FormBuilder, private _snackBar: MatSnackBar,
  ) {
    this.fileuploadform = this.formBuilder.group({
      file: [],
    })
  }

  ngOnInit(): void {
  }

  fileName: any;
  docfile: any;

  onSelectDoc(e: any) {
    if (e.target.files[0].length === 0)
      return;
    this.fileName = e.target.files[0];
    console.log(this.fileName.name);
    let newfile = this.fileName.name.split('.');
    var extFile = newfile[1];
    if (extFile == "pdf") {
      var file = e.target.files[0];
      this.fileuploadform.patchValue({
        file: file
      });
    }
    else {
      this._snackBar.open("Only pdf file are allowed!", '', {
        duration: 2000
      });
      this.clearSelectedPhoto()
      this.isDoc = true;
    }
  }
  clearSelectedPhoto() {
    this.docFile.nativeElement.value = null;
  }
  addFile() {
    if (this.fileuploadform.value.file == null) {
      this._snackBar.open("Please Select File", '', {
        duration: 2000
      });
    }
    else {
      // this.threeDService.show();
      this.userService.addFileFAQUpload(this.fileuploadform.value).subscribe(
        res => {
          if (res.status == 200) {
            this._snackBar.open(res.message, '', {
              duration: 2000
            });
            // this.threeDService.hide();
          } else {
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
          } 
            else {
              this._snackBar.open(error.error.message, '', {
                duration: 2000
              });
            }
            // this.threeDService.hide();
        });
    }
  }
}
