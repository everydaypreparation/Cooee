import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Links } from '../links.module';
import { map } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // 'authKey': 'a22f96db8bddb95ad0dc60dad56aaed6'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient,private snackbar: MatSnackBar) { }
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  openSnackbar(msg) {
    this.snackbar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
  }

  openSnackbarTime(msg: string, duration: number) {
    this.snackbar.open(msg, 'x', {
      duration: duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
  }
  login(data: any) {
    return this.http.post(Links.LOGIN, data,)
      .pipe(map((response: any) => response));
  }
  getWelcomeScreen() {
    return this.http.get(Links.GETWELCOMESCREEN)
      .pipe(map((response: any) => response));
  }
  addWelcomeScreen(form: any) {
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('descriptions', form.descriptions);
    formData.append('docfile', form.docfile);
    return this.http.post(Links.ADDWELCOME, formData)
      .pipe(map((response: any) => response));
  }

  updateWelcomeScreen(form: any, caroselId: any) {
    const formData = new FormData();
    formData.append('caroselId', caroselId);
    formData.append('title', form.title);
    formData.append('descriptions', form.descriptions);
    formData.append('docfile', form.docfile);
    return this.http.put(Links.UPDATEWELCOME, formData)
      .pipe(map((response: any) => response));
  }

  deleteWelcomeScreen(id: any) {
    return this.http.delete(Links.DELETEWELCOME + '?caroselId=' + id)
      .pipe(map((response: any) => response));
  }
  getAllUsers(data) {
    return this.http.get(Links.GETALLUSER+ `?pageNo=${data.pageNo}`+ `&pageSize=${data.pageSize}`+`&approved=${data.keyword}`+`&keyword=${data.search}`, )
      .pipe(map((response: any) => response));
  }
  getAllDID() {
    return this.http.get(Links.GETALLDID)
      .pipe(map((response: any) => response));
  }
  getAvailableDID() {
    return this.http.get(Links.GETAVAILBLEDID)
      .pipe(map((response: any) => response));
  }
  addDIDNumber(form: any) {
    return this.http.post(Links.ADDDIDNUMBER, form, )
      .pipe(map((response: any) => response));
  }
  getPersonalDetails(form:any) {
    return this.http.post(Links.GETPERSONALDETAILS,form)
      .pipe(map((response: any) => response));
  }
  rejectKyc(form: any) {
    return this.http.post(Links.REJECTKYC, form, )
      .pipe(map((response: any) => response));
  }
  approveKyc(form: any) {
    return this.http.post(Links.APPROVEKYC, form, )
      .pipe(map((response: any) => response));
  }
  userDelete(form: any) {
    return this.http.post(Links.USERDELETE, form, )
      .pipe(map((response: any) => response));
  }
  resetPassword(data: any,) {
    return this.http.post(Links.RESET_PASSWORD, data)
    .pipe(map((response: any) => response));
  }
  userChangePassword(data: any,) {
    return this.http.post(Links.USER_CHANGE_PASSWORD, data)
    .pipe(map((response: any) => response));
  }
  forgotPassword(form: any) {
    return this.http.post(Links.FORGOT_PASSWORD ,form,)
      .pipe(map((response: any) => response));
  }
  addBulkUpload(form: any) {
    return this.http.post(Links.ADDBULKUPLOAD, form, )
      .pipe(map((response: any) => response));
  }
  addFileTermConditionUpload(data) {
    const formData = new FormData();
    formData.append('file', data.file);
    return this.http.post(Links.ADDTERMCONDITION, formData).pipe(map((response: any) => response));
  }
  addFilePrivacyPolicyUpload(data) {
    const formData = new FormData();
    formData.append('file', data.file);
    return this.http.post(Links.ADDPRIVACYPOLICY, formData).pipe(map((response: any) => response));
  }
  addFileFAQUpload(data) {
    const formData = new FormData();
    formData.append('file', data.file);
    return this.http.post(Links.ADDFAQ, formData).pipe(map((response: any) => response));
  }
  getAllEmail(data) {
    return this.http.get(Links.GETALLEMAIL+`?type=${data}`, )
      .pipe(map((response: any) => response));
  }
  addEmail(form: any) {
    return this.http.post(Links.UPDATEEMAIL, form, )
      .pipe(map((response: any) => response));
  }
  getAllCountry() {
    return this.http.get(Links.GETALLCOUNTRY, )
      .pipe(map((response: any) => response));
  }
  emailNotification(form: any) {
    return this.http.post(Links.ADDEMAILNOTIFICATION, form, )
      .pipe(map((response: any) => response));
  }
  pushNotification(form: any) {
    return this.http.post(Links.ADDPUSHNOTIFICATION, form, )
      .pipe(map((response: any) => response));
  }
  addSubscriptionPlan(form: any) {
    return this.http.post(Links.ADDSUBSCRIPTIONPLAN, form, )
      .pipe(map((response: any) => response));
  }
  getAllSubscriptionplan() {
    return this.http.get(Links.GETALLSUBSCRIPTIONPLAN, )
      .pipe(map((response: any) => response));
  }
  subscriptionplanDelete(form: any) {
    return this.http.post(Links.SUBSCRIPTIONPLANDELETE, form, )
      .pipe(map((response: any) => response));
  }
  getSubscriptionplanDetailsById(data:any) {
    return this.http.post(Links.GETSUBSCRIPTIONPLANBYID,data )
      .pipe(map((response: any) => response));
  }
  changeSubscriptionplanByStatus(data) {
    return this.http.get(Links.SUBSCRIPTIONPLANCHANGEBYSTATUS+ `?id=${data.id}`+ `&status=${data.status}`, )
      .pipe(map((response: any) => response));
  }
  updateSubscriptionPlan(form: any) {
    return this.http.post(Links.UPDATESUBSCRIPTIONPLAN, form, )
      .pipe(map((response: any) => response));
  }
  getUserSubscriptionData(data) {
    return this.http.get(Links.GETUSERSUBSCRIPTION + `/${data.userId}`)
      .pipe(map((response: any) => response));
  }
  getAllTransaction() {
    return this.http.get(Links.GETALLTRANSACTION)
      .pipe(map((response: any) => response));
  }
  getAllSupportContent() {
    return this.http.get(Links.GETALLSUPPORTCONTENT)
      .pipe(map((response: any) => response));
  }
  addSupportcontentEmail(form: any) {
    return this.http.post(Links.ADDSUPPORTCONTENTEMAIL, form, )
      .pipe(map((response: any) => response));
  }
  addSupportcontentTicketClose(form: any) {
    return this.http.post(Links.ADDSUPPORTCONTENTTICKETCLOSE, form, )
      .pipe(map((response: any) => response));
  }
  virtualNumberDelete(form: any) {
    return this.http.post(Links.VIRTUALNUMBERDELETE, form, )
      .pipe(map((response: any) => response));
  }
  getRefund() {
    return this.http.get(Links.GETREFUND)
      .pipe(map((response: any) => response));
  }
  refundApprove(form: any) {
    return this.http.post(Links.REFUNDAPPROVE, form, )
      .pipe(map((response: any) => response));
  }
  refundReject(form: any) {
    return this.http.post(Links.REJECTKYC, form, )
      .pipe(map((response: any) => response));
  }
}
