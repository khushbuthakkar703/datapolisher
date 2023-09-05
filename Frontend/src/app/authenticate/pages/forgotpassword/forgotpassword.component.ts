import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/authenticate/services/user/user.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  ForgotForm: FormGroup | any;
  submitted = false;
  buttonshow = false
  constructor(private fb: FormBuilder, private userservice: UserService, private toast: ToastService, private router: Router) { }

  ngOnInit(): void {
    this.userservice.titleset("Forgot Password | RND")
    this.ForgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.ForgotForm.valid) {
      this.buttonshow = true;
      this.userservice.forgotuser(this.ForgotForm.value).then((data: any) => {
        var apidata = JSON.parse(data.json);
        if (data.status == 200) {
          this.buttonshow = false;
          this.toast.Success(apidata.msg);
          this.router.navigate(['forgot-confirm'], { queryParams: { email: this.ForgotForm.value.email } });
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
  get f() { return this.ForgotForm.controls; }

}
