import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/authenticate/services/user/user.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {
  filedata: any;
  filename: any;
  @ViewChild('closebutton') closebutton: any;
  dataSource: MatTableDataSource<FileData> | any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  displayedColumns = [
    "sr_no",
    "uid",
    "username",
    "input_file",
    "type",
    "Action"
  ];
  constructor(private authenticationService: UserService, public toast: ToastService,) { }

  ngOnInit(): void {
    this.getalldata();
  }
  csvuplaod(event: any) {
    this.filedata = event.files[0];
    this.filename = event.files[0]?.name
  }
  download(data: any) {
    // this.authenticationService.download(data.uid).subscribe((apidata) => {
    // })
  }
  getalldata() {
    this.authenticationService.getallfiledownloads().subscribe((apidata: any) => {
      if (apidata.status == "success") {
        this.dataSource = new MatTableDataSource(apidata.results);
        apidata.results.map((data: any, index: any) => {
          data.sr_no = index + 1
        })
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }
  submitfile() {
    var data = {
      "filename": this.filename,
      "contentType": "text/csv",
      "type": "query"
    }
    this.authenticationService.fileuploadresign(data).subscribe((apidata: any) => {
      if (apidata && apidata.status == 'success') {
        this.authenticationService.fileuploadgenerateurl(this.filedata, apidata.url).subscribe((upload: any) => {
          if (upload && upload.Status == 200) {
            this.toast.Success("File upload successful !")
          }
        })
      }
    })
    this.closebutton.nativeElement.click();
  }
}

export interface FileData {
  "sr_no": String,
  create_date: String,
  input_file: String,
  output_file: String,
  type: String,
  uid: String,
  username: String,
}
