import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CreatecompanyComponent } from './createcompany/createcompany.component';
import { CompanyinfoComponent } from './companyinfo/companyinfo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { MiddleComponent } from '../shared/middle/middle.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { HeaderComponent } from '../shared/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { FiledatalistComponent } from './filedatalist/filedatalist.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [
    CreatecompanyComponent,
    CompanyinfoComponent,
    FileuploadComponent,
    FiledatalistComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    NgxSpinnerModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [HeaderComponent, FooterComponent, MiddleComponent]
})
export class CompanyModule { }
