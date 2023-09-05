import { Injectable } from '@angular/core';
import * as Rx from "rxjs/Rx";
import { from, Observable, throwError } from 'rxjs';
import Notification from '../models/notification.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { environment, Notificationdata } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) { }

  notificationlist(id: any): Observable<Notification[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    var body = {
      "userId": id
    }
    return this.httpClient.post(
      environment.ApiUrl.apiServer + Notificationdata.list, body,
      { headers: headers }
    ).pipe(map((data: any) => {
      return data;
    })
    )
  }
  notificationupdate(id: any): Observable<Notification[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    var body = {
      "userId": id
    }
    return this.httpClient.post(
      environment.ApiUrl.apiServer + Notificationdata.update, body,
      { headers: headers }
    ).pipe(map((data: any) => {
      return data;
    })
    )
  }
  notificationdelete(body: any): Observable<Notification[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.httpClient.post(
      environment.ApiUrl.apiServer + Notificationdata.delete, body,
      { headers: headers }
    ).pipe(map((data: any) => {
      return data;
    })
    )
  }
}