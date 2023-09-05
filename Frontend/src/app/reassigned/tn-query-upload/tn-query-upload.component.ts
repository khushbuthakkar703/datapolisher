import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppState } from 'src/app/app.state';
import { UserService } from 'src/app/authenticate/services/user/user.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-tn-query-upload',
  templateUrl: './tn-query-upload.component.html',
  styleUrls: ['./tn-query-upload.component.scss']
})
export class TnQueryUploadComponent implements OnInit {
  filedata: any;
  filename: any;
  message: any;
  constructor(private store: Store<AppState>, private authenticationService: UserService, public toast: ToastService, public spinner: NgxSpinnerService) {
    this.authenticationService.titleset("TN Disconnect Query File Upload | RND")
  }

  ngOnInit(): void {

  }
  csvuplaod(event: any) {
    this.filedata = event.files[0];
    this.filename = event.files[0]?.name
  }
  clear() {
    this.filedata = ""
    this.filename = ""
  }
  async upload() {
    try {
      if (this.filedata && this.filename) {
        await this.spinner.show();
        var data = {
          "filename": this.filename,
          "contentType": this.filedata.type,
          "type": "query"
        }
        await this.authenticationService.fileuploadresign(data).subscribe(async (apidata: any) => {
          if (apidata && apidata.status == 'success') {
            await this.authenticationService.fileuploadgenerateurl(this.filedata, apidata.url).subscribe(async (upload: any) => {
              if (upload && upload.Status == 200) {
                this.message = "File uploaded successfully. You will receive an email when your results are ready to download.";
                this.toast.Success("File uploaded successfully. You will receive an email when your results are ready to download.")
                this.clear()
                await this.spinner.hide();

              }
              else {
                await this.spinner.hide();
              }
            }, err => {
              this.spinner.hide();
            })
          }
        }, err => {
          this.spinner.hide();
        })
      }
    }
    catch {
      this.spinner.hide();
    }


  }

}
