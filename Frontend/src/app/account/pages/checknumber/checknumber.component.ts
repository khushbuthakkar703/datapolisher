import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { AppState } from 'src/app/app.state';
import { UserService } from 'src/app/authenticate/services/user/user.service';
import { NotificationService } from 'src/app/notification/notification.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import * as NotificationActions from '../../../actions/notification.action'

@Component({
  selector: 'app-checknumber',
  templateUrl: './checknumber.component.html',
  styleUrls: ['./checknumber.component.scss']
})
export class ChecknumberComponent implements OnInit {
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  phoneForm = new FormGroup({
    phone: new FormControl(undefined, [Validators.required]),
  });
  id: any;
  constructor(private userservice: UserService, public store: Store<AppState>, private router: Router, private toast: ToastService, private NotificationService: NotificationService) { }

  ngOnInit(): void {
    this.store.select('user').subscribe((data: any) => {
      if (data) {
        this.id = data.id
      }
    }
    );
  }
  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }
  onSubmit() {
    if (this.phoneForm.valid) {
      try {
        var body = {
          "phone_number": this.phoneForm.value.phone.number,
          "id": this.id
        }
        this.userservice.Phonenumbervalid(body).then(async (data: any) => {
          var apidata = JSON.parse(data.json);
          if (data.status == 200) {
            if (apidata.Status == 200) {
              if (apidata.data && apidata.data.numberidentity && apidata.data.numberidentity.validity == "true") {
                await this.NotificationService.notificationlist(this.id)
                  .subscribe((data: any) => {
                    this.store.dispatch(new NotificationActions.Listnotification(data?.data?.Notification))
                  });
                await this.toast.Success(apidata.msg);

                // this.router.navigate(['account/profile'])
              }
              else {
                this.toast.Error("Phone number invalid");
              }
            }
            else {
              this.toast.Error("Phone number invalid");
            }
          }
          else {
            this.toast.Error(apidata.msg);
          }
        }, err => {
          this.toast.Error("Server error");

        })
      }
      catch (error: any) {
        this.toast.Error(error.message);
      }
    }
  }
}
