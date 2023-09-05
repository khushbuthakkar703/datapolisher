import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as NotificationActions from './../../actions/notification.action'
import { NotificationService } from '../../notification/notification.service'
import { Observable } from 'rxjs';
import Notification from 'src/app/models/notification.model';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  notification: Observable<Notification[]> | any;
  id: any;
  constructor(private store: Store<AppState>, public notificationservice: NotificationService, private toast: ToastService,) {
    store.pipe(select('notification')).subscribe(values => {
      this.notification = values ? values : [];
    })
  }

  ngOnInit(): void {
    this.store.select('user').subscribe(async (data: any) => {
      if (data) {
        this.id = data.id
        await this.notificationdataupdate()
        await this.notificationdata();

      }
    }
    );
  }
  notificationdataupdate() {
    this.notificationservice.notificationupdate(this.id)
      .subscribe((data: any) => {
        this.store.dispatch(new NotificationActions.Listnotification(data?.data?.Notification))
      });
  }
  notificationdata() {
    this.notificationservice.notificationlist(this.id)
      .subscribe((data: any) => {
        this.store.dispatch(new NotificationActions.Listnotification(data?.data?.Notification))
      });
  }
  deletenotification(item: any) {
    var data = {
      "notificationId": item._id,
      "userId": this.id

    }
    this.notificationservice.notificationdelete(data)
      .subscribe((data: any) => {
        this.store.dispatch(new NotificationActions.Listnotification(data?.data?.Notification))
        this.toast.Success("Notification delete successful !")
      });
  }

}
