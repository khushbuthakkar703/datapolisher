import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotpasswordComponent } from './pages/forgotpassword/forgotpassword.component';
import { ForgotpasswordconfirmComponent } from './pages/forgotpasswordconfirm/forgotpasswordconfirm.component';
import { ForgotusernameComponent } from './pages/forgotusername/forgotusername.component';
import { ForgotusernameconfirmComponent } from './pages/forgotusernameconfirm/forgotusernameconfirm.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-username', component: ForgotusernameComponent },
  { path: 'forgot-password', component: ForgotpasswordComponent },
  { path: 'forgot-confirm', component: ForgotpasswordconfirmComponent },
  { path: 'forgot-user-confirm', component: ForgotusernameconfirmComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticateRoutingModule { }
