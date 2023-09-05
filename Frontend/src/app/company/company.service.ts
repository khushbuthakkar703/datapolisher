
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Company, environment, Phonenumber } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: Http) { }
  getcountry() {
    return new Promise((resolve) => {
      this.http.post(environment.ApiUrl.apiServer + Company.getcountry, {}).subscribe(
        (res: any) => {
          resolve({ status: res.status, json: res["_body"] });
        },
        (err: any) => {
          resolve({ status: err.status, json: err["_body"] });
        }
      );
    })
  }

  getstate(data: any) {
    return new Promise((resolve) => {
      this.http.post(environment.ApiUrl.apiServer + Company.getstate, data).subscribe(
        (res: any) => {
          resolve({ status: res.status, json: res["_body"] });
        },
        (err: any) => {
          resolve({ status: err.status, json: err["_body"] });
        }
      );
    })
  }
  getcity(data: any) {
    return new Promise((resolve) => {
      this.http.post(environment.ApiUrl.apiServer + Company.getcity, data).subscribe(
        (res: any) => {
          resolve({ status: res.status, json: res["_body"] });
        },
        (err: any) => {
          resolve({ status: err.status, json: err["_body"] });
        }
      );
    })
  }
  Createcompany(data: any) {
    return new Promise((resolve) => {
      this.http.post(environment.ApiUrl.apiServer + Company.createcompany, data).subscribe(
        (res: any) => {
          resolve({ status: res.status, json: res["_body"] });
        },
        (err: any) => {
          resolve({ status: err.status, json: err["_body"] });
        }
      );
    })
  }
  UploadCSV(data: any) {
    return new Promise((resolve) => {
      this.http.post(environment.ApiUrl.apiServer + Phonenumber.UploadCSV, data).subscribe(
        (res: any) => {
          resolve({ status: res.status, json: res["_body"] });
        },
        (err: any) => {
          resolve({ status: err.status, json: err["_body"] });
        }
      );
    })
  }
  gettablelength(data: any) {
    return new Promise((resolve) => {
      this.http.post(environment.ApiUrl.apiServer + Phonenumber.length, data).subscribe(
        (res: any) => {
          resolve({ status: res.status, json: res["_body"] });
        },
        (err: any) => {
          resolve({ status: err.status, json: err["_body"] });
        }
      );
    })
  }

  deleteduplicate() {
    return new Promise((resolve) => {
      this.http.post(environment.ApiUrl.apiServer + Phonenumber.deleteduplicate, {}).subscribe(
        (res: any) => {
          resolve({ status: res.status, json: res["_body"] });
        },
        (err: any) => {
          resolve({ status: err.status, json: err["_body"] });
        }
      );
    })
  }
  download() {
    return new Promise((resolve) => {
      var header = new Headers();
      header.append("Content-disposition", "attachment; filename=" + '123.csv')
      header.append("Content-Type", "text/csv")
      let option = new RequestOptions({ headers: header })
      this.http.get(environment.ApiUrl.apiServer + Phonenumber.download, option).subscribe(
        (res: any) => {
          resolve({ status: res.status, json: res["_body"] });
        },
        (err: any) => {
          resolve({ status: err.status, json: err["_body"] });
        }
      );
    })
  }

}
