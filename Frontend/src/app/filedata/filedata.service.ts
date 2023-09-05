import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Company, environment, fileuploaddata, Phonenumber } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FiledataService {

  constructor(private http: Http) { }

  createfilefolder(data: any) {
    return new Promise((resolve) => {
      this.http.post(environment.ApiUrl.apiServer + fileuploaddata.createfile, data).subscribe(
        (res: any) => {
          resolve({ status: res.status, json: res["_body"] });
        },
        (err: any) => {
          resolve({ status: err.status, json: err["_body"] });
        }
      );
    })
  }
  fileuploadapi(data: any) {
    return new Promise((resolve) => {
      this.http.post(environment.ApiUrl.apiServer + fileuploaddata.fileuplaodset, data).subscribe(
        (res: any) => {
          resolve({ status: res.status, json: res["_body"] });
        },
        (err: any) => {
          resolve({ status: err.status, json: err["_body"] });
        }
      );
    })
  }

  filelist() {
    return new Promise((resolve) => {
      this.http.post(environment.ApiUrl.apiServer + fileuploaddata.listallfile, {}).subscribe((res: any) => {
        resolve({ status: res.status, json: res["_body"] });
      }, (err: any) => {
        resolve({ status: err.status, json: err["_body"] });
      })
    })

  }

  deletefile(data: any) {
    return new Promise((resolve) => {
      this.http.post(environment.ApiUrl.apiServer + fileuploaddata.deletefile, data).subscribe((res: any) => {
        resolve({ status: res.status, json: res["_body"] });
      }, (err: any) => {
        resolve({ status: err.status, json: err["_body"] });
      })
    })
  }
  downloadfile(data: any) {
    return new Promise((resolve) => {
      this.http.post(environment.ApiUrl.apiServer + fileuploaddata.downloadcontent, data).subscribe((res: any) => {
        resolve({ status: res.status, json: res["_body"] });
      }, (err: any) => {
        resolve({ status: err.status, json: err["_body"] });
      })
    })
  }
  filecheck(data: any) {
    return new Promise((resolve) => {
      this.http.post(environment.ApiUrl.apiServer + 'file/fileuploadqueue', data).subscribe((res: any) => {
        resolve({ status: res.status, json: res["_body"] });
      }, (err: any) => {
        resolve({ status: err.status, json: err["_body"] });
      })
    })
  }
}
