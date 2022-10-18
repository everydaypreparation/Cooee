import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ThreeDServiceService } from 'src/app/service/spinner.service';
import { UserService } from 'src/app/service/user.service';
export class CsvData {
  public id: any;
  public min: any;
  public max: any;
  public score: any;
}
export interface Country {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.scss']
})
export class BulkUploadComponent implements OnInit {

  submitted = false;
  bulkUploadForm: FormGroup;
  returnUrl: string;
  networkStatus: boolean = false;
  error = '';
  constructor(
    public fb: FormBuilder, private userService: UserService,  private threeDService: ThreeDServiceService, private _snackBar: MatSnackBar) {
    this.bulkUploadForm = this.fb.group({
      didNumber: ['',],
      country: ['', Validators.required,],
      // selState: ['',Validators.required],
      // selCity: ['',Validators.required],
    });
  }
  didNumber: any = [];
  isShown: boolean = false;
  public selCountry;
  public records: any[] = [];
  @ViewChild('csvReader') csvReader: any;
  jsondatadisplay: any;
  countries: Country[] = [
    { value: 'Aus', viewValue: 'Australia' }
  ];
  ngOnInit() {
  }

  toggleShow() {
    this.isShown = true
  }
  uploadListener($event: any): void {
    let text = [];
    let files = $event.srcElement.files;
    if (this.isValidCSVFile(files[0])) {
      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);
      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
        let headersRow = this.getHeaderArray(csvRecordsArray);
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
      };
      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };
    }
    else {
      this._snackBar.open("Please import valid .csv file!", '', {
        duration: 2000
      });
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];
    for (let i = 0; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        let csvRecord: CsvData = new CsvData();
        csvRecord.id = curruntRecord[0].trim();
        csvRecord.min = curruntRecord[1].trim();
        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.csvReader.nativeElement.value = "";
    this.records = [];
    this.jsondatadisplay = '';
  }
  get f() { return this.bulkUploadForm.controls; }
  getJsonData() {
    this.submitted = true;
    if (this.bulkUploadForm.invalid) {
      return;
    }
    this.jsondatadisplay = JSON.stringify(this.records);
    this.records.forEach((x: any) => {
      let mins = x.min;
      this.didNumber.push(x.min)
      this.bulkUploadForm.value.didNumber = this.didNumber;

    })
    this.threeDService.show();
    this.userService.addBulkUpload(this.bulkUploadForm.value).subscribe(res => {
      this.threeDService.hide();
      if (res.status == 200) {
        this._snackBar.open(res.message, '', {
          duration: 2000
        });
        this.fileReset()
      }
      else {
        this._snackBar.open(res.message, '', {
          duration: 2000
        });
      }
    }, error => {
      this.threeDService.hide();
      if (error.status == 400) {
        this._snackBar.open(error.error.message, '', {
          duration: 2000
        });
      } else {
        this._snackBar.open(error.error.message, '', {
          duration: 2000
        });
      }
      this.threeDService.hide();
    });

  }



}