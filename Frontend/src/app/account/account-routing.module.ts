import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangepasswordComponent } from './pages/changepassword/changepassword.component';
import { ChecknumberComponent } from './pages/checknumber/checknumber.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  { path: 'account/profile', component: ProfileComponent },
  { path: 'account/profile/changepassword', component: ChangepasswordComponent },
  { path: 'account/checknumber', component: ChecknumberComponent },


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
