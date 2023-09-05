import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MustMatch } from 'src/app/must-match.validator';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/authenticate/services/user/user.service';

@Component({
  selector: 'app-forgotusernameconfirm',
  templateUrl: './forgotusernameconfirm.component.html',
  styleUrls: ['./forgotusernameconfirm.component.scss']
})
export class ForgotusernameconfirmComponent implements OnInit {
  ForgotUserConfrim: FormGroup | any;
  submitted = false;
  email = "";
  data: any;
  buttonshow = false;
  constructor(public router: Router, public route: ActivatedRoute, private userservice: UserService, private fb: FormBuilder, private toast: ToastService) {
    this.email = this.route.snapshot.queryParams['email'] || null;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(this.email).toLowerCase())) {
      this.Usergetdata();
    }
    else {
      this.router.navigate(['login'])
    }

  }
  Usergetdata() {
    var body = {
      email: this.email
    }
    this.userservice.getuser(body).then((data: any) => {
      if (data.status == 200) {
        this.data = JSON.parse(data.json);
      }
      else {
        this.router.navigate(['login'])
      }
    }, err => {
      this.router.navigate(['login'])
    })
  }

  ngOnInit(): void {
    this.userservice.titleset("Forgot Username | RND")

    this.ForgotUserConfrim = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required]
    });
  }
  onSubmit() {
    this.submitted = true;
    try {
      if (this.ForgotUserConfrim.valid) {
        this.buttonshow = true;
        var body = {
          email: this.email,
          name: this.ForgotUserConfrim.value.name,
          code: this.ForgotUserConfrim.value.code
        }
        this.userservice.ConfirmUserCode(body).then((data: any) => {
          var apidata = JSON.parse(data.json);
          if (data.status == 200) {
            this.buttonshow = false;
            this.router.navigate(['login']);
            this.toast.Success(apidata.msg)
          }
          else {
            this.buttonshow = false;
            if (apidata.msg == 'Invalid User') {
              this.router.navigate(['login']);
              this.toast.Error("Invalid code")
            }
            else {
              this.toast.Error(apidata.msg)
            }
          }
        }, err => {
          this.buttonshow = false;
          this.toast.Error("server error")
        })
      }
    }
    catch (error: any) {
      this.buttonshow = false;
      this.toast.Error(error.message)
    }
  }
  get f() { return this.ForgotUserConfrim.controls; }
}
