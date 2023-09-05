import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { UserService } from 'src/app/authenticate/services/user/user.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-tn-disconnect-query',
  templateUrl: './tn-disconnect-query.component.html',
  styleUrls: ['./tn-disconnect-query.component.scss']
})
export class TnDisconnectQueryComponent implements OnInit {
  dateset: '';
  Telephonearray = [{
    date: "",
    tn: "",
    companyId: "C581698581",
    message: "",
  }]
  dataSource: MatTableDataSource<FileData> | any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  displayedColumns = [
    "tn",
    "dateProvided",
    "disconnected",
    "companyId",
  ];
  replaydata: any;
  userid: any;
  constructor(private store: Store<AppState>, private authenticationService: UserService, private toast: ToastService,) {
    this.authenticationService.titleset("Query Telephone Number Disconnect | RND")
    this.store.pipe(select('user')).subscribe(values => {
      console.log("values", values)
      this.userid = values.id;
    })
  }

  ngOnInit(): void {
  }
  changedate(event: any) {
  }
  addtelephone() {
    this.Telephonearray.push({
      date: "",
      tn: "",
      companyId: "C581698581",
      message: "",
    })
  }
  remove(item: any) {
    this.Telephonearray.splice(item, 1)
  }
  numberOnly(event: any, value: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    var valuecheck = value ? (value).toString().length >= 10 : false
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    else if (!valuecheck) {
      return true;
    }
    return false;
  }
  validationchange(item: any) {
    item.message = "";
    item.tn ? item.tn.length < 10 ? item.message = "Telephone Number must be 10 digits." : "" : item.message = "Telephone Number is required."
    if (!item.date) {
      item.message = item.message + "Date is required."
    }
    if (!item.companyId) {
      item.message = item.message + "CompanyId is required."
    }
  }
  clearfield() {
    this.Telephonearray = [];
    this.replaydata = [];
    this.Telephonearray = [{
      date: "",
      tn: "",
      companyId: "C581698581",
      message: "",
    }]
  }
  async submnitsearch() {
    var dataset = this.Telephonearray.filter(item => item.date != item.date && item.tn != item.tn && item.companyId != item.companyId)
    if (dataset.length == 0 && this.Telephonearray && this.Telephonearray.length > 0) {
      await this.authenticationService.TelephoneNumberCDR(this.Telephonearray, this.userid).subscribe((set: any) => {
      })
      await this.authenticationService.telephonenumber(this.Telephonearray).subscribe(async (data: any) => {
        if (data && data.Status == 200 && data.data && data.data.replies) {
          this.replaydata = data.data.replies;
          this.dataSource = new MatTableDataSource(data.data.replies);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        else {
          if (data && data.errList && data.errList[0]) {
            this.toast.Error(data.errList[0].errMsg)
          }
        }
      })
    }
    else {
      this.toast.Error("Please enter valid data");
    }
  }
}
export interface FileData {
  companyId: String,
  dateProvided: String,
  disconnected: String,
  tn: String,
}

