import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReassignedRoutingModule } from './reassigned-routing.module';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TnQueryUploadComponent } from './tn-query-upload/tn-query-upload.component';
import { TnDisconnectQueryComponent } from './tn-disconnect-query/tn-disconnect-query.component';
import { QueryResultsComponent } from './query-results/query-results.component';
import { MatTableExporterModule } from 'mat-table-exporter';

@NgModule({
  declarations: [
    FileuploadComponent,
    TnQueryUploadComponent,
    TnDisconnectQueryComponent,
    QueryResultsComponent
  ],
  imports: [
    CommonModule,
    ReassignedRoutingModule,
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
    MatTableExporterModule,
    MatButtonModule,

  ]
})
export class ReassignedModule { }
