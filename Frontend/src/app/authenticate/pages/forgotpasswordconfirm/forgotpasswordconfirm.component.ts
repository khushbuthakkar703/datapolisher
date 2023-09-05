import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MustMatch } from 'src/app/must-match.validator';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/authenticate/services/user/user.service';

@Component({
  selector: 'app-forgotpasswordconfirm',
  templateUrl: './forgotpasswordconfirm.component.html',
  styleUrls: ['./forgotpasswordconfirm.component.scss']
})
export class ForgotpasswordconfirmComponent implements OnInit {
  ForgotpassConfrim: FormGroup | any;
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

  ngOnInit(): void {
    this.userservice.titleset("Forgot Password | RND")
    this.ForgotpassConfrim = this.fb.group({
      code: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}')]],
      confirmpassword: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmpassword')
    });
  }
  onSubmit() {
    this.submitted = true;
    try {
      if (this.ForgotpassConfrim.valid) {
        this.buttonshow = true;
        var body = {
          email: this.email,
          password: this.ForgotpassConfrim.value.password,
          confirmpassword: this.ForgotpassConfrim.value.confirmpassword,
          code: this.ForgotpassConfrim.value.code
        }
        this.userservice.ConfirmCode(body).then((data: any) => {
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
  get f() { return this.ForgotpassConfrim.controls; }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

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
}
