import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment, NeonBilling } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NeonbillService {
  private NeonloginSubject: BehaviorSubject<any>;
  public Neoncontentset: Observable<any>;
  constructor(private httpClient: HttpClient, private router: Router) {
    this.NeonloginSubject = new BehaviorSubject<any>(null);
    this.Neoncontentset = this.NeonloginSubject.asObservable();
  }
  NeonToken(data: any) {
    return this.httpClient.post(`${environment.ApiUrl.apiServer + NeonBilling.TokenNeon}`, data).pipe(map((user: any) => {
      this.NeonloginSubject.next(user);
      this.startRefreshTokenTimer();
      return user;
    }));
  }
  refreshToken() {
    var Token = window.localStorage.getItem("NeonApitoken") ? JSON.parse(window.localStorage.getItem("NeonApitoken")) : null;
    if (Token) {
      return this.httpClient.post(`${environment.ApiUrl.apiServer + NeonBilling.RefreshTokenNeon}`, { refresh_token: Token.RefreshToken }).pipe(map((user: any) => {
        window.localStorage.setItem("NeonApitoken", JSON.stringify(user))
        this.NeonloginSubject.next(user);
        this.startRefreshTokenTimer();
        return user;
      }));
    }
    else {
      this.logout();
      return Token;
    }
  }
  private refreshTokenTimeout: any;
  private startRefreshTokenTimer() {
    const timeout = 500 * 1000;
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }
  stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
  public get Neontokenvalue(): any {
    return this.NeonloginSubject.value;
  }
  logout() {
    this.stopRefreshTokenTimer();
    window.localStorage.removeItem("NeonApitoken")
    this.NeonloginSubject.next(null);
    this.router.navigate(['/neonlogin']);
  }
}
