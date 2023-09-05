import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NeonbillingRoutingModule } from './neonbilling-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { NeonbillService } from './services/neonbill.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';




@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    NeonbillingRoutingModule
  ],
  providers: [
  ],
})
export class NeonbillingModule { }
