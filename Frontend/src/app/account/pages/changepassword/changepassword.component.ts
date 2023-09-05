import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { UserService } from 'src/app/authenticate/services/user/user.service';
import { MustMatch, PasswordValidator } from 'src/app/must-match.validator';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  changepasswordForm: FormGroup | any;
  submitted = false;
  constructor(private userservice: UserService, private fb: FormBuilder, private router: Router, private toast: ToastService, public store: Store<AppState>) {
    this.userservice.titleset("Change Password | RND")
  }
  ngOnInit(): void {
    this.changepasswordForm = this.fb.group({
      currentpassword: ['', [Validators.required]],
      Newpassword: ['', [Validators.required, PasswordValidator.Uppercase, PasswordValidator.Lowercase, Validators.minLength(7), PasswordValidator.Speacialchar, PasswordValidator.Number]],
      confirmpassword: ['', Validators.required],
    }, {
      validator: MustMatch('Newpassword', 'confirmpassword')
    });
  }
  onSubmit() {
    this.submitted = true;
    this.store.select('user').subscribe(
      data => {
        if (data) {
          if (this.changepasswordForm.valid) {
            var body = {
              id: data.id,
              currentpassword: this.changepasswordForm.value.currentpassword,
              Newpassword: this.changepasswordForm.value.Newpassword,
              confirmpassword: this.changepasswordForm.value.confirmpassword
            }
            this.userservice.Changepassword(body).then((dataget: any) => {
              var apidata = JSON.parse(dataget.json);
              if (dataget.status == 200) {
                this.toast.Success(apidata.msg);
                this.router.navigate(['account/profile'])
              }
              else {
                this.toast.Error(apidata.msg);
              }


            })
          }
        }
      }
    );

  }
  get f() {
    return this.changepasswordForm.controls;
  }

}
