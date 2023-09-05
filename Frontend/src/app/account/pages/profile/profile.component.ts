import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { UserService } from 'src/app/authenticate/services/user/user.service';
import { ClipboardService } from 'ngx-clipboard'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userdata = {
    name: '',
    email: '',
    id: '',
    Username: '',
    Title: '',
    workphone: '',
    SecondaryPhone: '',
    apikey: '',
  };
  constructor(private userservice: UserService, public store: Store<AppState>, private _clipboardService: ClipboardService) {
    this.userservice.titleset("Profile | RND")

  }

  ngOnInit(): void {




    this.store.select('user').subscribe(
      (data: any) => {
        var body = {
          "email": data.email
        }
        this.userservice.getuser(body).then((data: any) => {
          var apidata = JSON.parse(data.json);
          if (data.status == 200) {
            this.userdata = {
              name: apidata && apidata.user.name ? apidata.user.name : '-',
              email: apidata && apidata.user.email ? apidata.user.email : '-',
              id: apidata && apidata.user._id ? apidata.user._id : '-',
              Username: apidata && apidata.user.name ? apidata.user.name : '-',
              Title: '-',
              workphone: apidata && apidata.user.mobilenumber ? apidata.user.mobilenumber : '-',
              SecondaryPhone: apidata && apidata.user.mobilenumber ? apidata.user.mobilenumber : '-',
              apikey: apidata && apidata.user.apikey ? apidata.user.apikey : '-'
            }
          }

        }, err => {
        })
        // this.userdata = {
        //   name: data && data.name ? data.name : '-',
        //   email: data && data.email ? data.email : '-',
        //   id: data && data.id ? data.id : '-',
        //   Username: data && data.Username ? data.Username : '-',
        //   Title: data && data.Title ? data.Title : '-',
        //   workphone: data && data.workphone ? data.workphone : '-',
        //   SecondaryPhone: data && data.SecondaryPhone ? data.SecondaryPhone : '-',
        // };

      }
    );
  }
  copy() {
    this._clipboardService.copy(this.userdata.apikey)
  }

}
