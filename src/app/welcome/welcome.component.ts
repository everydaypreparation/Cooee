import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { Slick } from 'ngx-slickjs';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { removeSpaces } from '../shared/must-match.validator';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  @ViewChild('inputFile') inputFile!: ElementRef;
  welcomeForm: FormGroup = new FormGroup({});
  updateWelcomeForm: FormGroup = new FormGroup({});
  networkStatus: boolean = false;
  image: any
  id: number = 0;
  displayStyle: any = "none";
  unSelectedFile: any;
  descLength: number = 0;
  docUrl: any;
  isDoc: boolean = false;
  WelcomeData: any;
  imagePath: any;
  displayStyles: any = "none";
  popUp: any = "none";
  fsSubject = new Subject();
  fstSubject = new Subject();
  submitted = false;
  fsValue = 'fs-11';
  styleData: any = [];
  dynamicSlides = [
    { id: 1, src: "assets/images/Mask-Group.png", alt: 'Side 1' },
    { id: 2, src: "assets/images/Frame8655.png", alt: 'Side 2' },
    { id: 3, src: "assets/images/Mockup@1x.png", alt: 'Side 3' },
    { id: 4, src: "assets/images/Mask-Group.png", alt: 'Side 4' },
    { id: 4, src: "assets/images/Mockup@1x.png", alt: 'Side 5' },
  ];
  imgUrl: any;
  fstValue = 'regular';
  styleOne: boolean = false;
  fonttitleStyle: string = '';
  fonttitleWeight: string = '';
  fontDescStyle: string = '';
  fontDescWeight: string = '';
  isError: boolean = false;
  result: any;
  xxx: any;
  responsiveOptions;
  constructor(public dialog: MatDialog, private router: Router,
    private fb: FormBuilder, private _snackBar: MatSnackBar,
    public userService: UserService) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
    this.welcomeForm = this.fb.group({
      title: ['', Validators.required],
      descriptions: ['', Validators.required],
      docfile: [''],

    })

    this.fsSubject.subscribe((value: any) => {
      this.fsValue = ~value.indexOf('fs-') ? value : `fs-${value}`;
    })
    this.fstSubject.subscribe((value: any) => {
      this.fstValue = ~value.indexOf('fst-') ? value : `fst-${value}`;
    })
  }

  //  customOptions: OwlOptions = {
  //   loop: true,
  //   autoplay: true,
  //   center: true,
  //   dots: false,
  //   autoHeight: true,
  //   autoWidth: true,
  //   responsive: {
  //     0: {
  //       items: 1,
  //     },
  //     600: {
  //       items: 1,
  //     },
  //     1000: {
  //       items: 1,
  //     }
  //   }
  // }
  arrayLength = 10;

  config: Slick.Config = {
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          infinite: true
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          dots: true
        }
      },

      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          dots: true
        }

      }

    ]
  }

  getArray(count: number) {
    return new Array(count)
  }
  ngOnInit(): void {
    this.getWelcomeData()
    console.log(sessionStorage.getItem("Token"), "=========");

  }


  get f() { return this.welcomeForm.controls; }



  fileName: any;
  onSelectDoc(e: any) {
    console.log(e);

    if (e.target.files[0].length === 0)
      return;
    this.fileName = e.target.files[0];
    console.log(this.fileName.name);
    let newfile = this.fileName.name.split('.');
    var extFile = newfile[1];

    //  var idxDot = this.fileName.lastIndexOf(".") + 1;
    // var extFile = this.fileName.substr(idxDot, this.fileName.length).toLowerCase();
    console.log(extFile);

    if (extFile == "jpg" || extFile == "jpeg" || extFile == "png" || extFile == "PNG") {
      var file = e.target.files[0];
      console.log(file)
      if (file.size <= 5120000) {

        var reader = new FileReader();
        this.imagePath = file;
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
          this.docfile = reader.result;
        }
        this.welcomeForm.patchValue({
          docfile: file
        });
      } else {
        this._snackBar.open("File size exceeds", '', {
          duration: 2000
        });
        this.clearSelectedPhoto()
        this.isDoc = false;

      }
    } else {
      this._snackBar.open("Only jpg/jpeg and png files are allowed!", '', {
        duration: 2000
      });
      this.clearSelectedPhoto()
      this.isDoc = true;
    }
  }

  clearSelectedPhoto() {
    this.inputFile.nativeElement.value = null;
  }


  changeTitleStyle(e: any) {
    const titlestyle = e.target.value
    console.log(titlestyle);

    if (titlestyle == 'bold') {
      this.fonttitleStyle = '';
      this.fonttitleWeight = titlestyle;
    } else {
      this.fonttitleWeight = '';
      this.fonttitleStyle = titlestyle;
    }
  }

  changeDescStyle(e: any) {
    const descstyle = e.target.value
    console.log(descstyle);

    if (descstyle == 'bold') {
      this.fontDescStyle = '';
      this.fontDescWeight = descstyle;
    } else {
      this.fontDescWeight = '';
      this.fontDescStyle = descstyle;
    }
  }

  getWelcomeData() {
    this.styleData = []
    //  this.threeDService.show();
    this.userService.getWelcomeScreen().subscribe(res => {

      console.log();

      if (res.responseCode == 200) {
        //  this.threeDService.hide();
        this.WelcomeData = res.data;
        console.log(this.styleData);

        for (let i = 0; i < this.WelcomeData.length; i++) {
          let arrIndex = this.styleData.findIndex((item: any) => item.id == this.WelcomeData[i].caroselId);
          if (arrIndex === -1) {
            this.styleData.push(
              {
                imgUrl: this.WelcomeData[i].imgUrl,
                title: this.WelcomeData[i].title,
                descriptions: this.WelcomeData[i].descriptions,
                textColor: this.WelcomeData[i].title_font_color,
                textSize: this.WelcomeData[i].title_font_size,
                textStyle: this.WelcomeData[i].title_font_style,
                descColor: this.WelcomeData[i].descriptions_font_color,
                descSize: this.WelcomeData[i].descriptions_font_size,
                descStyle: this.WelcomeData[i].descriptions_font_style,
                id: this.WelcomeData[i].caroselId
              }

            )
          }

          console.log(this.styleData, "sss");
        }
        this.id = res.data.caroselId;
        this.result = this.WelcomeData.length
        this.docfile = res.data.imgUrl;
        //  this.threeDService.hide();
      } else {
        //  this.threeDService.hide();
        this._snackBar.open(res.message, '', {
          duration: 2000
        });
      }
    },
      error => {
        // this.threeDService.hide();
        if (error.status == 400) {
          // this.toastr.error(error.error.message);
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

  addWelcomeData() {
    this.image = this.welcomeForm.value.docfile;
    console.log(this.image);
    this.submitted = true;
    if (this.welcomeForm.invalid) {
      return;
    }
    //  this.threeDService.show();
    this.userService.addWelcomeScreen(this.welcomeForm.value).subscribe(res => {
      if (res.responseCode == 200) {
        //  this.threeDService.hide();
        //  this.toastr.success(res.message);
        this._snackBar.open(res.message, '', {
          duration: 2000
        });
        this.closePopup();
        this.getWelcomeData();
      }
      else {
        //  this.threeDService.hide();
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

  updateWelcomeData() {
    this.submitted = true;
    if (this.welcomeForm.invalid) {
      return;
    }
    // this.threeDService.show();
    console.log(this.welcomeForm.value)
    this.userService.updateWelcomeScreen(this.welcomeForm.value, this.caroselID).subscribe(res => {
      if (res.responseCode == 200) {
        //  this.threeDService.hide();
        //  this.toastr.success(res.message);
        this._snackBar.open(res.message, '', {
          duration: 2000
        });
        this.updateclosePopup();
        this.getWelcomeData();
      }
      else {
        //  this.threeDService.hide();
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


  deleteWelcomeData() {
    console.log(this.cId, this.idx);
    //  this.threeDService.show();    
    this.userService.deleteWelcomeScreen(this.cId).subscribe(res => {
      if (res.responseCode == 200) {
        //  this.threeDService.hide();
        this._snackBar.open(res.message, '', {
          duration: 2000
        });
        this.styleData.splice(this.idx, 1)
        this.getWelcomeData();
        this.closeDeletePopup()
      } else {
        //  this.threeDService.hide();
        this._snackBar.open(res.message, '', {
          duration: 2000
        });
      }
    },
      error => {
        // this.threeDService.hide();
        if (error.status == 400) {
          // this.toastr.error(error.error.message);
          this._snackBar.open(error.error.message, '', {
            duration: 2000
          });
        } else {
          // this.toastr.error(error.error.message);
          this._snackBar.open(error.error.message, '', {
            duration: 2000
          });
        }
        // this.threeDService.hide();

      })

  }


  openPopup() {
    this.displayStyle = "block";
    this.clearSelectedPhoto()

    this.welcomeForm.patchValue({
      title: '',
      descriptions: '',
      imgUrl: '',
      title_font_color: '',
      title_font_size: '',
      title_font_style: '',
      descriptions_font_color: '',
      descriptions_font_size: '',
      descriptions_font_style: ''
    })
  }

  closePopup() {
    this.displayStyle = "none";
  }

  caroselID: any;
  title: any;
  descriptions: any;
  docfile: any;
  title_font_color: any;
  updateopenPopup(slide: any, index: any) {
    this.welcomeForm.patchValue({
      title: slide.title,
      descriptions: slide.descriptions,
      docfile: slide.imgUrl,
      title_font_color: slide.textColor,
      title_font_size: slide.textSize,
      title_font_style: slide.textStyle,
      descriptions_font_color: slide.descColor,
      descriptions_font_size: slide.descSize,
      descriptions_font_style: slide.descStyle,
      index: index
    })
    console.log(slide);
    this.title = slide.title;
    this.docfile = slide.imgUrl;
    this.caroselID = slide.id;
    this.displayStyles = "block";
  }

  updateclosePopup() {
    this.displayStyles = "none";
  }


  cId: any;
  idx: any;
  openDeletePopup(cId: any, index: any) {
    this.cId = cId;
    this.idx = index;
    this.popUp = "block";
  }
  closeDeletePopup() {
    this.popUp = "none";
  }

  fsChanged(event: any) {
    this.fsSubject.next((event.target.value || 11));
  }
  fstChanged(event: any) {
    this.fstSubject.next((event.target.value));
  }

}
