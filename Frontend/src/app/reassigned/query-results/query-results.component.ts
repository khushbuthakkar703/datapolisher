import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/authenticate/services/user/user.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-query-results',
  templateUrl: './query-results.component.html',
  styleUrls: ['./query-results.component.scss']
})
export class QueryResultsComponent implements OnInit {
  dataSource: MatTableDataSource<FileData> | any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  displayedColumns = [
    "username",
    "type",
    "create_date",
    "input_file",
    "output_file",
    "Action"
  ];
  constructor(private authenticationService: UserService, public toast: ToastService,) {
    this.authenticationService.titleset("Downloads | RND")
  }

  ngOnInit(): void {
    this.getalldata();
  }
  getalldata() {
    this.authenticationService.getallfiledownloads().subscribe((apidata: any) => {
      if (apidata.status == "success") {
        this.dataSource = new MatTableDataSource(apidata.results.reverse());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }
  csvdownload(row: any, name: any) {
    this.authenticationService.download(row.uid, name).subscribe((apidata: any) => {
      if (apidata && apidata.status == 'success') {
        this.authenticationService.download_URL_To(apidata.url).subscribe((csvdata: any) => {
          if (csvdata) {
            this.downloadFile(csvdata, row.output_file ? row.output_file : 'data')
          }
        })
      }
    })
  }
  downloadFile(data: any, filename: any) {
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
  reportdownload(row: any) {
    this.authenticationService.downloadreport_generate(row.uid).subscribe((apidata: any) => {
      if (apidata && apidata.status == 'success') {
        this.authenticationService.downloadreport(apidata.url).subscribe((csvdata: any) => {
          if (csvdata) {
            this.downloadFile(csvdata, row.output_file ? row.output_file : 'data')
          }
        })
      }
    })
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
