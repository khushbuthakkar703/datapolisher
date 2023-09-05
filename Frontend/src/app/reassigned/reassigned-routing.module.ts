import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { QueryResultsComponent } from './query-results/query-results.component';
import { TnDisconnectQueryComponent } from './tn-disconnect-query/tn-disconnect-query.component';
import { TnQueryUploadComponent } from './tn-query-upload/tn-query-upload.component';

const routes: Routes = [
  { path: 'query/fileupload', component: FileuploadComponent },
  { path: 'query/tn-query-upload', component: TnQueryUploadComponent },
  { path: 'query/tn-disconnect-query', component: TnDisconnectQueryComponent },
  { path: 'query/query-results', component: QueryResultsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReassignedRoutingModule { }
