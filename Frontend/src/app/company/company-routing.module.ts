import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyinfoComponent } from './companyinfo/companyinfo.component';
import { CreatecompanyComponent } from './createcompany/createcompany.component';
import { FiledatalistComponent } from './filedatalist/filedatalist.component';
import { FileuploadComponent } from './fileupload/fileupload.component';

const routes: Routes = [
  { path: 'company', component: CreatecompanyComponent },
  { path: 'companyinfo', component: CompanyinfoComponent },
  { path: 'fileupload', component: FileuploadComponent },
  { path: 'fileupload/list', component: FiledatalistComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
