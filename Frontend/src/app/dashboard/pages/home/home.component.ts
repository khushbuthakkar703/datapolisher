import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { UserService } from 'src/app/authenticate/services/user/user.service';
import User from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Userdata: any;
  constructor(public store: Store<AppState>, public userservice: UserService) {
    this.userservice.titleset("Welcome to Reassigned Numbers Database")
    this.store.select('user').subscribe(
      data => {
        this.Userdata = data;
      }
    );
  }
  ngOnInit(): void {
  }
}
