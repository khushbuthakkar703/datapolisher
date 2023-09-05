import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/authenticate/services/user/user.service';
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as UserActions from './../../../actions/user.actions'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  submitted = false;
  constructor(private store: Store<AppState>, private fb: FormBuilder, private userservice: UserService, private toast: ToastService, private router: Router, private route: ActivatedRoute) {
    var login: any = window.localStorage.getItem("Loginuser");
    if (login && login == "true") {
      this.router.navigate(['dashboard'])
    }
  }
  ngOnInit(): void {

    this.userservice.titleset("Login | RND")
    this.loginForm = this.fb.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      try {
        this.userservice.login(this.loginForm.value).then((data: any) => {
          var apidata = JSON.parse(data.json);
          if (data.status == 200) {
            this.toast.Success(apidata.msg);
            // this.userservice.resigntoken().subscribe(data => {
            //   this.userservice.storeUserData(data.idToken);
            // })
            window.localStorage.setItem("Loginuser", "true");
            this.store.dispatch(new UserActions.Adduser({ name: apidata.user.name, email: apidata.user.email, id: apidata.user.id }))
            var uri = this.route.snapshot.queryParams['returnUrl'] || null;
            if (uri) {
              this.router.navigateByUrl(uri);
            }
            else {
              this.router.navigate(['dashboard'])
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
  get f() { return this.loginForm.controls; }
}


