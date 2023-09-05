import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MiddleComponent } from './middle/middle.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MiddleComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatBadgeModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MiddleComponent
  ]
})
export class SharedModule { }
