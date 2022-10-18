export class Links {
    ////////////////////// BaseUrl //////////////////////
    // public static BASE = 'http://151.106.34.115:8080/cooee';
    // public static BASE = 'https://secureparcelservice.com:8443/cooee';
    public static BASE = 'http://dollarsimclub.com:8080/cooee';

    // public static BASE = 'http://192.168.0.181:8080';

    ////////////////////// Api ///////////////////////////
    public static VERSION = "3.8";
    public static LOGIN = Links.BASE + '/admin/login';
    public static CHANGE_PASSWORD = Links.BASE + '/api/hev/changePassword';
    public static GETWELCOMESCREEN = Links.BASE + '/get_welcome_carousel';
    public static ADDWELCOME = Links.BASE + '/add_welcome_carousel';
    public static UPDATEWELCOME = Links.BASE + '/update_welcome_carousel';
    public static DELETEWELCOME = Links.BASE + '/delete_welcome_carousel';
    public static GETALLUSER = Links.BASE + '/user/getAll';
    public static GETALLDID = Links.BASE + '/admin/getAllDID';
    public static GETAVAILBLEDID = Links.BASE + '/admin/getAllAvailableDidNumber';
    public static ADDDIDNUMBER = Links.BASE + '/admin/addDidNumber';
    public static GETPERSONALDETAILS = Links.BASE + '/user/getProfile';
    public static REJECTKYC = Links.BASE + '/admin/rejectKyc';
    public static APPROVEKYC = Links.BASE + '/admin/approveKycWithPayment';
    public static RESET_PASSWORD = Links.BASE + '/user/updatePassword';
    public static FORGOT_PASSWORD = Links.BASE + '/admin/resetPassword';
    public static ADDBULKUPLOAD = Links.BASE + '/admin/bulkUpload';
    public static ADDTERMCONDITION = Links.BASE + '/admin/upload_term_and_condition';
    public static ADDPRIVACYPOLICY = Links.BASE + '/admin/upload_privacy_policy';
    public static ADDFAQ = Links.BASE + '/admin/upload_cooeefaq';
    public static USER_CHANGE_PASSWORD = Links.BASE + '/admin/resetUserPassword';
    public static USERDELETE = Links.BASE + '/admin/delete';
    public static GETALLEMAIL = Links.BASE + '/EmailTemplates/getEmailByType';
    public static UPDATEEMAIL = Links.BASE + '/EmailTemplates/update';
    public static GETALLCOUNTRY = Links.BASE + '/admin/getAllCountries';
    public static ADDEMAILNOTIFICATION = Links.BASE + '/admin/sentPushNotificationOnEmail';
    public static ADDPUSHNOTIFICATION = Links.BASE + '/admin/sentPushNotification';
    public static ADDSUBSCRIPTIONPLAN = Links.BASE + '/admin/addSubscriptionPlan';
    public static GETALLSUBSCRIPTIONPLAN  = Links.BASE + '/admin/getAllSubscriptionPlan';
    public static SUBSCRIPTIONPLANDELETE  = Links.BASE + '/admin/deleteByIdSubscriptionPlan';
    public static GETSUBSCRIPTIONPLANBYID  = Links.BASE + '/admin/getByIdSubscriptionPlan';
    public static SUBSCRIPTIONPLANCHANGEBYSTATUS = Links.BASE + '/admin/changeStatusById';
    public static UPDATESUBSCRIPTIONPLAN = Links.BASE + '/admin/updateSubscriptionPlan';
    public static GETUSERSUBSCRIPTION = Links.BASE + '/user/userSubscriptionPlan';
    public static GETALLTRANSACTION = Links.BASE + '/user/getAllTransaction';
    public static GETALLSUPPORTCONTENT = Links.BASE + '/admin/getAllSupportTicket';
    public static ADDSUPPORTCONTENTEMAIL = Links.BASE + '/admin/sendSupportContentEmail';
    public static ADDSUPPORTCONTENTTICKETCLOSE = Links.BASE + '/admin/updateSupportContentRemark';
    public static VIRTUALNUMBERDELETE = Links.BASE + '/admin/deleteVirtualNumberById';
    public static GETREFUND = Links.BASE + '/admin/getAllRefunds';
    public static REFUNDAPPROVE = Links.BASE + '/admin/refundApprove';
    public static REFUNDREJECT = Links.BASE + '/admin/refundReject';

    
    
}
