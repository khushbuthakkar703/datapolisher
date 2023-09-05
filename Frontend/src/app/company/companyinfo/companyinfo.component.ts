import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from '../company.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-companyinfo',
  templateUrl: './companyinfo.component.html',
  styleUrls: ['./companyinfo.component.scss']
})


export class CompanyinfoComponent implements OnInit {
  fileReaded: any;
  displayedColumns = ['EMAIL', 'FIRST NAME', 'LAST NAME', 'PHONE'];
  dataSource: MatTableDataSource<UserData> | any;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  Totallength = 0;
  searchvalue: any = "";
  constructor(public companyservice: CompanyService,) {
    const users: UserData[] = [];
  }

  ngOnInit(): void {
    this.gettablelength();
  }
  async gettablelength() {
    await this.companyservice.gettablelength({ pageskip: 0, pagelimit: 5, pageindex: 0, search: this.searchvalue }).then((res: any) => {
      var apidata = JSON.parse(res.json);
      if (res.status == 200) {
        this.dataSource = new MatTableDataSource(apidata.data);
        this.Totallength = apidata.length;
        this.paginator.length = this.Totallength;
        this.dataSource.sort = this.sort;
      }
    })
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
    // filterValue.target.value = filterValue.target.value.trim(); // Remove whitespace
    // filterValue.target.value = filterValue.target.value.toLowerCase(); // Datasource defaults to lowercase matches
    // this.dataSource.filter = filterValue.target.value;
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


