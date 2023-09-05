import { Injectable } from '@angular/core';
import { environment, fileuploaddata, Phonenumber, Reassign, ReassignLocal, UserApi } from 'src/environments/environment';
import {
  Http,
} from '@angular/http';
import { Title } from "@angular/platform-browser";
import { Observable, BehaviorSubject, Subject, of, Subscription } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'
// import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Usertoken } from 'src/app/models/user.model';
import { AppState } from 'src/app/app.state';
import { select, Store } from '@ngrx/store';
import * as UserActions from './../../../actions/user.actions'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  authToken: any;
  // user: any;
  tokenSubscription = new Subscription()
  timeout: any;


  private userSubject: BehaviorSubject<Usertoken>;
  public user: Observable<Usertoken>;

  constructor(private store: Store<AppState>, private http: Http, private titleService: Title, private httpClient: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<Usertoken>(null);
    this.user = this.userSubject.asObservable();
  }
  // , private jwtHelper: JwtHelperService
  login(data: any) {
    return new Promise((resolve) => {
      this.http.post(environment.ApiUrl.apiServer + UserApi.login, data).subscribe(
        (res: any) => {
          resolve({ status: res.status, json: res["_body"] });
        },
        (err: any) => {
          resolve({ status: err.status, json: err["_body"] });
        }
      );
    })
  }
  register(data: any) {
    return new Promise((resolve) => {
      this.http.post(environment.ApiUrl.apiServer + UserApi.register, data).subscribe((res: any) => {
        resolve({ status: res.status, json: res["_body"] });
      },
        (err: any) => {
          resolve({ status: err.status, json: err["_body"] })
        })
    })
  }
  forgotuser(data: any) {
    return new Promise((resolve) => {
      this.http.post(environment.ApiUrl.apiServer + UserApi.forgotpassword, data).subscribe((res: any) => {
        resolve({ status: res.status, json: res["_body"] });
      },
        (err: any) => {
          resolve({ status: err.status, json: err["_body"] })
        })
    })
  }
  getuser(data: any) {
    return new Promise((resolve) => {
      this.http.post(environment.ApiUrl.apiServer + UserApi.getUser, data).subscribe((res: any) => {
        resolve({ status: res.status, json: res["_body"] });
      },
        (err: any) => {
          resolve({ status: err.status, json: err["_body"] })
        })
    })
  }
  ConfirmCode(data: any) {
    return new Promise((resolve) => {
      this.http.post(environment.ApiUrl.apiServer + UserApi.confirmcode, data).subscribe((res: any) => {
        resolve({ status: res.status, json: res["_body"] });
      },
        (err: any) => {
          resolve({ status: err.status, json: err["_body"] })
        })
    })
  }
  forgotusername(data: any) {
    return new Promise((resolve) => {
      this.http.post(environment.ApiUrl.apiServer + UserApi.forgotusermail, data).subscribe((res: any) => {
        resolve({ status: res.status, json: res["_body"] });
      },
        (err: any) => {
          resolve({ status: err.status, json: err["_body"] })
        })
    })
  }

  ConfirmUserCode(data: any) {
    return new Promise((resolve) => {
      this.http.post(environment.ApiUrl.apiServer + UserApi.confirmusercode, data).subscribe((res: any) => {
        resolve({ status: res.status, json: res["_body"] });
      },
        (err: any) => {
          resolve({ status: err.status, json: err["_body"] })
        })
    })
  }
  titleset(data: any) {
    this.titleService.setTitle(data)
  }
  Changepassword(data: any) {
    return new Promise((resolve) => {
      this.http.post(environment.ApiUrl.apiServer + UserApi.changepassword, data).subscribe((res: any) => {
        resolve({ status: res.status, json: res["_body"] });
      },
        (err: any) => {
          resolve({ status: err.status, json: err["_body"] })
        })
    })
  }
  Phonenumbervalid(data: any) {
    return new Promise((resolve) => {
      this.http.post(environment.ApiUrl.apiServer + Phonenumber.PhoneValid, data).subscribe((res: any) => {
        resolve({ status: res.status, json: res["_body"] });
      },
        (err: any) => {
          resolve({ status: err.status, json: err["_body"] })
        })
    })
  }
  resigntoken(): Observable<any> {
    return this.httpClient.post(Reassign.Url + Reassign.IdToken, {
      "refreshToken": Reassign.tokendev,
    }).pipe(map((data: any) => {
      return data;
    }))
  }
  telephonenumber(data: any): Observable<any> {
    return this.httpClient.post(Reassign.Url + Reassign.TelephoneNumber, {
      tnList: data
    }, {
      headers: {
        "Authorization": `Bearer ${this.userValue.idToken}`
      }
    })
  }
  TelephoneNumberCDR(data: any, userid: any): Observable<any> {
    return this.httpClient.post(environment.ApiUrl.apiServer + Reassign.cdrlog, {
      tnList: data,
      userid: userid
    })
  }
  // telephonenumber(data: any): Observable<any> {
  //   this.store.pipe(select('user')).subscribe(values => {
  //     console.log("values", values)
  //   })
  //   return this.httpClient.post(environment.ApiUrl.apiServer + ReassignLocal.TelephoneNumber, {
  //     tnList: data,
  //     idToken: this.userValue.idToken
  //   })
  // }
  fileuploadresign(data: any): Observable<any> {
    return this.httpClient.post(Reassign.Url + Reassign.fileupload, data, { headers: { "Authorization": `Bearer ${this.userValue.idToken}` } })
  }
  fileuploadgenerateurl(data: any, Url: any): Observable<any> {
    var body = {
      filedata: data,
      uri: Url
    }
    return this.httpClient.post(environment.ApiUrl.apiServer + fileuploaddata.reassignedgenerateupload, body, { headers: { "Authorization": `Bearer ${this.userValue.idToken}` } })
  }
  getallfiledownloads(): Observable<any> {
    return this.httpClient.get(Reassign.Url + Reassign.download, { headers: { "Authorization": `Bearer ${this.userValue.idToken}` } })
  }
  download(id: any, name: any): Observable<any> {
    return this.httpClient.get(Reassign.Url + Reassign.fileupload + '/' + id + "-" + name, { headers: { "Authorization": `Bearer ${this.userValue.idToken}` } })
  }
  download_URL_To(url: any): Observable<any> {
    // let headers: HttpHeaders = new HttpHeaders();
    // headers = headers.append('Accept', 'text/csv');
    let httpOptions = { headers: new HttpHeaders({ "Accept": "text/csv" }), responseType: 'text' as 'json' };

    return this.httpClient.get<string>(url, httpOptions)
  }
  downloadreport_generate(id: any): Observable<any> {
    return this.httpClient.get(Reassign.Url + Reassign.fileupload + '/' + id, { headers: { "Authorization": `Bearer ${this.userValue.idToken}` } })
  }

  downloadreport(url: any): Observable<any> {
    let httpOptions = { responseType: 'text' as 'json' };

    return this.httpClient.get<string>(url, httpOptions)
  }
  public get userValue(): Usertoken {
    return this.userSubject.value;
  }
  logout() {
    this.stopRefreshTokenTimer();
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
  refreshToken() {
    return this.httpClient.post(`${Reassign.Url + Reassign.IdToken}`, { "refreshToken": Reassign.tokendev }).pipe(map((user: any) => {
      this.userSubject.next(user);
      this.startRefreshTokenTimer();
      return user;
    }));
  }
  // helper methods
  private refreshTokenTimeout: any;
  private startRefreshTokenTimer() {
    const timeout = 3500 * 1000;
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }
  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}



  //auto logout


  // storeUserData(token: any) {
  //   this.timeout = 1000 * 60 * 60;
  //   localStorage.setItem("id_token", token);
  //   this.authToken = token;
  //   this.expirationCounter(this.timeout);
  // }

  // expirationCounter(timeout: any) {
  //   this.tokenSubscription.unsubscribe();
  //   this.tokenSubscription = of(null).pipe(delay(timeout)).subscribe((expired) => {
  //     this.logout();
  //     this.router.navigate(["/login"]);
  //   });
  // }

  // logout() {
  //   this.tokenSubscription.unsubscribe();
  //   this.authToken = null;
  //   this.user = null;
  //   sessionStorage.clear();
  //   localStorage.clear()
  // }