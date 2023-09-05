import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticateRoutingModule } from './authenticate-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { ForgotpasswordComponent } from './pages/forgotpassword/forgotpassword.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotusernameComponent } from './pages/forgotusername/forgotusername.component';
import { ForgotpasswordconfirmComponent } from './pages/forgotpasswordconfirm/forgotpasswordconfirm.component';
import { ForgotusernameconfirmComponent } from './pages/forgotusernameconfirm/forgotusernameconfirm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user/user.service';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    ForgotusernameComponent,
    ForgotpasswordconfirmComponent,
    ForgotusernameconfirmComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticateRoutingModule,
    SharedModule
  ],
  exports: [],
  providers: [UserService]
})
export class AuthenticateModule { }
