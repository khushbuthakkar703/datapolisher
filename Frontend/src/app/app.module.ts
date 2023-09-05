import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { ActionReducer, ActionReducerMap, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { Userreducer } from './reducers/user.reducer';


import { localStorageSync } from 'ngrx-store-localstorage';
import { AppState } from './app.state';
import { RouterModule } from '@angular/router';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ClipboardModule } from 'ngx-clipboard';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { Notificationreducer } from './reducers/notification.reducer';
import { appInitializer } from './app.initializer';
import { UserService } from './authenticate/services/user/user.service';
import { JwtInterceptor } from './jwt.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { NeonbillService } from './neonbilling/services/neonbill.service';
const reducers: ActionReducerMap<any> = { user: Userreducer, notification: Notificationreducer };
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['user', 'notification'], rehydrate: true },)(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    SharedModule,
    NgxIntlTelInputModule,
    ClipboardModule,
    MatIconModule,
    StoreModule.forRoot(
      reducers,
      { metaReducers }
    ),
    RouterModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      autoPause: true,
    }),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      closeButton: false,
    }),
    MatIconModule,
    MatSortModule,


  ],
  providers: [{ provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [UserService] },
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// {
//   provide: APP_INITIALIZER,
//     useFactory: NeonInitializer,
//       multi: true,
//         deps: [NeonbillService]
// },