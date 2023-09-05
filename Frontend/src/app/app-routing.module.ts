import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./authenticate/authenticate.module').then(m => m.AuthenticateModule)
  },
  {
    path: "",
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: "",
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
    canActivate: [AuthGuard]
  },
  {
    path: "",
    loadChildren: () => import('./company/company.module').then(m => m.CompanyModule),
    canActivate: [AuthGuard]
  },
  {
    path: "",
    loadChildren: () => import('./filedata/filedata.module').then(m => m.FiledataModule),
    canActivate: [AuthGuard]
  },
  {
    path: "",
    loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule),
    canActivate: [AuthGuard]
  },
  {
    path: "",
    loadChildren: () => import('./neonbilling/neonbilling.module').then(m => m.NeonbillingModule),
    canActivate: [AuthGuard]
  },
  {
    path: "",
    loadChildren: () => import('./reassigned/reassigned.module').then(m => m.ReassignedModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


