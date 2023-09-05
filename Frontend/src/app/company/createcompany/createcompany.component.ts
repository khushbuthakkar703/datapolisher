import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { ToastService } from 'src/app/services/toast/toast.service';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-createcompany',
  templateUrl: './createcompany.component.html',
  styleUrls: ['./createcompany.component.scss']
})
export class CreatecompanyComponent implements OnInit {
  countrydata: any = [];
  countryCode: any;
  statedata: any = [];
  statecode: any;
  citydata: any = [];
  CreateComapny: FormGroup | any;
  submitted = false;

  constructor(public companyservice: CompanyService, private fb: FormBuilder, public store: Store<AppState>, private toast: ToastService,) { }

  ngOnInit(): void {
    this.CreateComapny = this.fb.group({
      Comapnyname: ['', [Validators.required]],
      Countryname: ['', [Validators.required]],
      State: ['', [Validators.required]],
      City: ['', [Validators.required]],
      Street: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
      type: ['', [Validators.required]]
    });
    this.getcountry()
  }
  getcountry() {
    this.companyservice.getcountry().then((data: any) => {
      if (data.status == 200) {
        var apidata = JSON.parse(data.json)
        this.countrydata = apidata.data

      }
    })
  }
  countrychange(event: any) {
    if (event.target.value) {
      this.countryCode = event.target.value;
      this.companyservice.getstate({ countryCode: event.target.value }).then((data: any) => {
        if (data.status == 200) {
          var apidata = JSON.parse(data.json)
          this.statedata = apidata.data
          this.statecode = "";
          this.countryCode = "";
        }
      })
    }
    else {
      this.statecode = "";
      this.countryCode = "";
    }
  }
  statechange(event: any) {
    if (event.target.value) {
      this.statecode = event.target.value;

    }
    else {
      this.statecode = "";
    }
  }
  onSubmit() {
    this.submitted = true;
    if (this.CreateComapny.valid) {
      var userId = "";
      this.store.select('user').subscribe(
        (data: any) => {

          if (data && data.id) {
            userId = data.id;

          }
        }
      );
      var set = {
        companyname: this.CreateComapny.value.Comapnyname,
        companycity: this.CreateComapny.value.City,
        companycountry: this.CreateComapny.value.Countryname,
        companystate: this.CreateComapny.value.Street,
        companystreet: this.CreateComapny.value.Street,
        companyzip: this.CreateComapny.value.zipcode,
        companytype: this.CreateComapny.value.type,
        userId: userId
      }
      this.companyservice.Createcompany(set).then((data: any) => {
        var apidata = JSON.parse(data.json);
        if (data.status == 200) {
          this.toast.Success(apidata.msg);
          this.CreateComapny.reset();
          this.submitted = false;
        }
        else {
          this.toast.Error(apidata.msg);
        }
      })
    }

  }
  get f() { return this.CreateComapny.controls; }
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
