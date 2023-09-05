import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/must-match.validator';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/authenticate/services/user/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup | any;
  submitted = false;
  constructor(private fb: FormBuilder, public userservice: UserService, private toast: ToastService, private router: Router) { }
  ngOnInit(): void {
    this.userservice.titleset("Register | RND")
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}')]],
      confirmpassword: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmpassword')
    });
  }
  onSubmit() {
    this.submitted = true
    if (this.registerForm.valid) {
      try {
        var body = {
          name: this.registerForm.value.name,
          email: this.registerForm.value.email,
          password: this.registerForm.value.password,
          usertype: 1,
          confirmpassword: this.registerForm.value.confirmpassword
        }
        this.userservice.register(body).then((data: any) => {
          var apidata = JSON.parse(data.json);
          if (data.status == 200) {
            this.toast.Success(apidata.msg);
            this.router.navigate(["login"])
          }
          else {
            this.toast.Error(apidata.msg);
          }
        })
      }
      catch (error: any) {
        this.toast.Error(error.message)
      }
    }
  }
  get f() { return this.registerForm.controls; }
}
