import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from '../company.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-filedatalist',
  templateUrl: './filedatalist.component.html',
  styleUrls: ['./filedatalist.component.scss']
})
export class FiledatalistComponent implements OnInit {

  fileReaded: any;
  displayedColumns = ['Srno', 'EMAIL', 'FIRST NAME', 'LAST NAME', 'PHONE'];
  dataSource: MatTableDataSource<UserData> | any;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  Totallength = 0;
  searchvalue: any = "";
  message: any;


  constructor(public companyservice: CompanyService, public spinner: NgxSpinnerService, public toast: ToastService) {
    const users: UserData[] = [];
  }

  async ngOnInit() {
    this.message = "Loading data please wait...";
    await this.spinner.show()
    await this.gettablelength();
    await this.spinner.hide()
  }
  async gettablelength() {
    try {
      await this.companyservice.gettablelength({ pageskip: 0, pagelimit: 5, pageindex: 0, search: this.searchvalue }).then((res: any) => {
        var apidata = JSON.parse(res.json);
        if (res.status == 200) {
          this.dataSource = new MatTableDataSource(apidata.data);
          this.Totallength = apidata.length;
          this.paginator.length = this.Totallength;
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

  csvuplaod(csv: any) {
    const input: any = document.getElementById('fileInput');
    const reader = new FileReader();
    reader.onload = async () => {
      let text: any = reader.result;
      var json: any = this.csvJSON(text);
      var parse = JSON.parse(json)
      if (parse && parse.length > 0) {
        const n = 100000; //tweak this to add more items per line
        const result = new Array(Math.ceil(parse.length / n))
          .fill(null)
          .map(_ => parse.splice(0, n))
        var i = 0;
        if (result && result.length) {

          for (let i = 0; i < result.length;) {
            await this.companyservice.UploadCSV({ datacsv: result[i] }).then((res: any) => {

              if (res.status == 200) {
                i++;
              }
            })
          }
        }

      }
    };
    reader.readAsText(input.files[0]);
  }
  ngAfterViewInit() {
  }
  applyFilter(filterValue: any) {
    this.searchvalue = filterValue.target.value;
    this.companyservice.gettablelength({ pageskip: 0, pagelimit: 5, pageindex: 0, search: this.searchvalue }).then((res: any) => {
      var apidata = JSON.parse(res.json);
      if (res.status == 200) {
        this.dataSource = new MatTableDataSource(apidata.data);
        this.Totallength = apidata.length;
        this.paginator.length = this.Totallength;
        this.dataSource.sort = this.sort;
        this.paginator.pageIndex = 0;
      }
    })
  }

  csvJSON(csv: any) {
    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].split(",");
    for (var i = 1; i < lines.length; i++) {
      var obj: any = {};
      var currentline = lines[i].split(",");
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }
  async getServerData(event: any) {
    await this.companyservice.gettablelength({ pageskip: event.pageIndex, pagelimit: event.pageSize, pageindex: event.pageIndex, search: this.searchvalue }).then((res: any) => {
      var apidata = JSON.parse(res.json);
      if (res.status == 200) {
        this.dataSource = new MatTableDataSource(apidata.data);
        this.Totallength = apidata.length;
        this.paginator.length = this.Totallength;
        this.dataSource.sort = this.sort;
      }
    })
  }
  async delete() {
    this.message = "Duplicate record deleteing start...";
    try {
      await this.spinner.show();
      this.companyservice.deleteduplicate().then(async (res: any) => {
        var apidata = JSON.parse(res.json);
        if (res.status == 200) {
          await this.gettablelength()
          await this.spinner.hide()
          await this.toast.Success("Duplicate record deleted successful !")
        }
        else {
          await this.toast.Error(apidata.msg)
        }
      })
    }
    catch (error: any) {
      this.toast.Error(error.message)
      await this.spinner.hide()

    }
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
  ConvertToCSV(objArray: any, headerList: any) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No,';
    for (let index in headerList) {
      row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = (i + 1) + '';
      for (let index in headerList) {
        let head = headerList[index];

        line += ',' + array[i][head];
      }
      str += line + '\r\n';
    }
    return str;
  }
  async download() {
    try {
      this.message = "Downloading file.."
      await this.spinner.show()
      await this.companyservice.download().then(async (data: any) => {
        if (data && data.json) {
          const month = new Date().getMonth();
          const day = new Date().getDay();
          const year = new Date().getFullYear();
          var hours = new Date().getHours();
          var minutes = new Date().getMinutes();
          var second = new Date().getSeconds();
          var milisecond = new Date().getMilliseconds();
          const output = month + '-' + day + '-' + year + '-' + hours + 'H-' + minutes + 'M-' + second + 'S-' + milisecond + 'MS';
          await this.downloadFile(data.json, output);
          await this.toast.Success("Download successful !")
        }
        else {
          await this.toast.Error("Downloading error !")
        }

      })
      await this.spinner.hide()
    }
    catch {
      this.toast.Error("Downloading error !")

      await this.spinner.hide()

    }


  }

}

export interface UserData {
  "_id": string;
  "LAST NAME": string;
  "FIRST NAME": string;
  "PHONE": string;
  "ALT PHONE": string;
  "EMAIL": string;
  "ADDRESS": string;
  "CITY": string
  "STATE": string
  "ZIP": string
  "COUNTRY": string
  "RESORT": string
  "BEST TIME TO CALL": string
  "created_date": string
  "updated_date": string
}