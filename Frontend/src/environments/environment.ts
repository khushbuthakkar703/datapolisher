// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ApiUrl: {
    apiServer: "http://" + window.location.hostname + ":8000/"
  },

};
export const UserApi = {
  login: "user/login",
  register: "user/register",
  forgotpassword: "user/forgotpasswordmail",
  getUser: "user/getuser",
  confirmcode: "user/confrimcode",
  forgotusermail: "user/forgotusermail",
  confirmusercode: "user/confrimusercode",
  changepassword: 'user/changepassword'
}

export const Company = {
  getcountry: "company/getcountry",
  getstate: "company/getstate",
  createcompany: "company/createcompany",
  getcity: "company/getcity"
}


export const Phonenumber = {
  UploadCSV: "phnonumber/uploadcsv",
  PhoneValid: "phnonumber/numberidentity",
  length: "phnonumber/totallength",
  deleteduplicate: "phnonumber/deleteduplicate",
  download: "phnonumber/download"
}

export const fileuploaddata = {
  createfile: "file/createfile",
  fileuplaodset: 'file/fileuplaodset',
  listallfile: "file/listallfile",
  deletefile: "file/deletefile",
  downloadcontent: "file/downloadcontent",
  reassignedgenerateupload: "file/reassignedgenerateupload"
}
export const Notificationdata = {
  list: "notification/Notificationlist",
  update: "notification/Notificationupdate",
  delete: "notification/Notificationdelete"
}

export const Reassign = {
  tokendev: "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.UrbyQLBVVMuDqUIVOxz9_xev9QzLKZB8CAgHyPsGUn-znVO4bSHXkfdZHm-3YBrXW8kTjQ0oqygZKu_lc2s7hFzaupZ2A09LCpvClRxctN6ycbITX4N49LYmvd1VSw40jIwYT7ASKcbL7n-u9gMS3t1MnCkahQoO7X85SBMqSMFlN-P33msRl3m5q9F0kEiI4cbR10Vjl6_Kq8LHG5im4Iz1U_oc7f2DGuRDBrojCQzg53U8eJzLRN5tK5z-f3KLSEFyua-eDwVRDx-nuKtdFNU55DttgHmZPYBs-nDrtKd-xBp50-3SP0uTuMh3njfzTZiwSbpcTVty_hH7LD9Tqw.QwQugXoN-BzlD5YX.VvvJ7mdgc5WtokCp9hkzFJ0XmAXTgAwzbB5UZpk27bDJgOUj2OZhsqQCNKTPQzh-B510sve1TDTEpe5PuiHZ250OnJp7-FmjUF9CbT2LxKCsToEAeokhpts9fGnw9lBH8DJ1GXTof4lwVTHql_q5z3XUGhWzKnXSjQAxLIMAPGBOZ16wTyYyNd4Ry5pXysLld4sELGdNPt2LryhYVWypL6z13T8o7WMW2eqwRPQR4jsoLpGvvDbm4BWKTUgeibx3mHbfKgD1ixfXbccxMLUA_Q0owlzmOP_cl2kM6Q-p320TX2DfHo7zDw5z4n1T_c0abeRHg4vWLZZTXxCTAcp655-g72rwlK8Mww2zebjJI1DilKSREKcuegov-UTjgLged3OdpFfIB796NhY5_3fOGYsERw4NzlW3ooUrgQ2fAxKQpNXmgWPdGb-3TbvOTG2S8W6Q_EITQzC5DqquS2PWOlvbK3lnsXWhXMgqqwwaRYQCi63SvN2BBCu2emW7XKTUP0UhipkM2o_hZIiGuUokbu2SIVHveYlvYkFyPZIgJB9OUfev86eohP2nlq9SFpy4L9V95rI3OUHDl5RmETN19TqCwfkqsLVEGrIMutFFd43aX5Q9yglc5Kdv1h0vz6Xlxhd5BnmcJAO-cFMd-vXz87TH36ECapxJvw5tCHsJ5im5n7zbMcULswJwGn_QyHqp_OBzd_86dkJanDChZwphnrjHbSOg2dkRTC16u3uogmMjTrDg8OLU1gHfX-dsLHJ7qK2EsHyvGk03AoirCwl-yqbISVBuMpe8ShJR1QPRVVknzHczzRyF6cM3Jlr6iUCqE88KMRwmLnMt9DhgIYDmALqsg3IjsRFOlatoso1eRN2DkQ2aTkZP5YQyfBJd8YHPvcP1YMhEKJMaH7tn9C8BWT37UgUUh1qeanyHsw8wqPbgCXDw50AAAeFIz4qaKnYSNHwgpPxVg51QPYs5-6ONCjk3wCOj5n8FlWacoxOD47Gm0mVrB-XhJMf5GKASn18sLHfCl69Z6Th0Uxc4gNAYa6QOxgUpzJbHm84i45MubIP1fInVk_K_SINJfr_Ozy2__PxYayH3QAFWlJtkcaYH9Vftt5pU6ypqPNXmYNLPzj1TI8w8wA20bMA5WIzrz5sFiGbp90z4Ribc36yh54ZVOEnmfjCXhbGq6Ls2A3Jn7u0M1Rmq1FvCyYXtw1kBMyPQ_hb6IUAottF2NhG3_XdRg-_WVuOElfHPyqxUQVJOqN8Lmn6M9MApzR_zHht_b57v1S230k6WTUO48Is_IntD.NaGNaMAaPYuvVUQE-t-C-w",
  Url: "https://api.reassigned.us/",
  IdToken: "b/public/api/idToken",
  TelephoneNumber: "api/tn",
  fileupload: "uploads/url",
  download: "downloads",
  cdrlog: "ResignUrl/TelephoneNumber"
}

export const NeonBilling = {
  Url: "https://portal.cherryvoice.com/api/oauth2/",
  client_id: "506e242d6eb994da2a85cb89e0ba7a8b5a406006",
  redirect_url: "http://localhost:4200/neonlogin",
  TokenNeon: "neonbilling/NeonToken",
  RefreshTokenNeon: "neonbilling/NeonRefreshToken",
}

export const ReassignLocal = {
  TelephoneNumber: "ResignUrl/TelephoneNumber",
}
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
