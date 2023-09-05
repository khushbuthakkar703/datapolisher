import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { MiddleComponent } from '../shared/middle/middle.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ChangepasswordComponent } from './pages/changepassword/changepassword.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChecknumberComponent } from './pages/checknumber/checknumber.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

import { ClipboardModule } from 'ngx-clipboard';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ProfileComponent,
    ChangepasswordComponent,
    ChecknumberComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    NgxIntlTelInputModule,
    ClipboardModule,
    MatIconModule

  ],
  exports: [HeaderComponent, FooterComponent, MiddleComponent]
})
export class AccountModule { }
