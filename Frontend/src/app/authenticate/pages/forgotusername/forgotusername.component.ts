import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/authenticate/services/user/user.service';

@Component({
  selector: 'app-forgotusername',
  templateUrl: './forgotusername.component.html',
  styleUrls: ['./forgotusername.component.scss']
})
export class ForgotusernameComponent implements OnInit {
  ForgotUserForm: FormGroup | any;
  submitted = false;
  buttonshow = false
  constructor(private fb: FormBuilder, private userservice: UserService, private toast: ToastService, private router: Router) { }


  ngOnInit(): void {
    this.userservice.titleset("Forgot Username | RND")
    this.ForgotUserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.ForgotUserForm.valid) {
      this.buttonshow = true;
      this.userservice.forgotusername(this.ForgotUserForm.value).then((data: any) => {
        var apidata = JSON.parse(data.json);
        if (data.status == 200) {
          this.buttonshow = false;
          this.toast.Success(apidata.msg);
          this.router.navigate(['forgot-user-confirm'], { queryParams: { email: this.ForgotUserForm.value.email } });
        }
        else {
          this.buttonshow = false;
          this.toast.Error(apidata.msg);
        }
      }, err => {
        this.buttonshow = false;

      })
      this.buttonshow = false;
    }


  }
  get f() { return this.ForgotUserForm.controls; }
}
