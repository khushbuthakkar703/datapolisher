import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiledataRoutingModule } from './filedata-routing.module';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    FileuploadComponent
  ],
  imports: [
    CommonModule,
    FiledataRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    NgxSpinnerModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class FiledataModule { }
