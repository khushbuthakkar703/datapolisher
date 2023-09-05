import { Component, OnInit, ViewChild } from '@angular/core';
import { FiledataService } from '../filedata.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { NgxSpinnerService } from "ngx-spinner";
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
  @ViewChild('deleteclosebutton') deleteclosebutton: any;

  filename: any = "";
  filedata: any;
  message: any;
  dataSource: MatTableDataSource<FileData> | any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  displayedColumns = [
    "sr_no",
    "file_name",
    "company-id",
    "file_tags",
    "file_status",
    "Action"
  ];
  fileobject: any
  constructor(public filedataService: FiledataService, public toast: ToastService, public spinner: NgxSpinnerService) { }

  async ngOnInit() {
    this.message = "Loading data please wait...";
    await this.spinner.show()
    await this.filelist();
    this.dataSource.paginator = this.paginator;
    await this.spinner.hide()
  }
  async submitfile() {
    if (this.filedata && this.filename) {
      await this.spinner.show();
      var formdata = new FormData();
      formdata.append("image", this.filedata)
      formdata.append("filename", this.filename)

      await this.filedataService.filecheck(formdata).then(async (data: any) => {
        if (data.status == 200) {
          this.toast.Success("File upload successful !")
          await this.filelist()
          await this.spinner.hide();
        }
        else {
          this.toast.Error("File can't upload !")
          await this.spinner.hide();
        }
      })
      this.closebutton.nativeElement.click();
      await this.spinner.hide();
    }
  }
  async deletefile() {
    this.spinner.show()
    var body: any = {
      fileid: this.fileobject.file_id,
      companyid: this.fileobject["company-id"]
    }
    try {
      await this.filedataService.deletefile(body).then(async (res: any) => {
        var apidata = JSON.parse(res.json);
        if (res.status == 200) {
          await this.toast.Success("Delete successful !");
          await this.filelist();
          await this.spinner.hide()

        }
        else {
          this.toast.Error("Delete error !");
          this.spinner.hide()

        }
      }, err => {
        this.toast.Error("Delete error !");
        this.spinner.hide()

      })
    }
    catch {
      this.spinner.hide()

    }
    this.deleteclosebutton.nativeElement.click();

  }
  csvuplaod(event: any) {
    this.filedata = event.files[0];
  }
  async filelist() {
    try {
      await this.filedataService.filelist().then((res: any) => {
        var apidata = JSON.parse(res.json);
        if (res.status == 200) {
          apidata.data.forEach((element: any, index: any) => {
            element.sr_no = index + 1
          });
          this.dataSource = new MatTableDataSource(apidata.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }, err => {
        this.spinner.hide()

      })
    }
    catch {
      this.spinner.hide()

    }
  }
  deletefiledata(row: any) {
    this.fileobject = row;
  }
  async downloadfiles(row: any) {
    var body = {
      fileurl: row.file_uri,
      companyid: row["company-id"]
    }
    this.filedataService.downloadfile(body).then(async (res: any) => {
      var apidata = JSON.parse(res.json);
      const month = new Date().getMonth();
      const day = new Date().getDay();
      const year = new Date().getFullYear();
      var hours = new Date().getHours();
      var minutes = new Date().getMinutes();
      var second = new Date().getSeconds();
      var milisecond = new Date().getMilliseconds();
      const output = month + '-' + day + '-' + year + '-' + hours + 'H-' + minutes + 'M-' + second + 'S-' + milisecond + 'MS';
      await this.downloadFile(apidata.data, output);
    })
  }
  downloadFile(data: any, filename = 'data') {
    let blob = new Blob(['\ufeff' + data], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;

    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }
}
export interface FileData {
  "sr_no": String,
  "file_id": String,
  "file_name": String,
  "company-id": String,
  "app_name": String,
  "file_status": String,
  "file_uri": String,
  "file_version": String,
  "file_size": String,
  "file_fullsize": String,
  "creation_time": String,
  "modified_time": String,
  "file_retention_time": String,
  "expire_time": String,
}
