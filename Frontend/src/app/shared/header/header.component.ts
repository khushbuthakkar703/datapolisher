import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() show = false;
  shownnotification = false;
  totallength = 0;
  constructor(private router: Router, private store: Store<AppState>) {
    store.pipe(select('notification')).subscribe(values => {
      var data: any = values ? values : [];
      var set = data.filter((item: any) => item.readnotification == false);
      if (set && set.length > 0) {
        this.shownnotification = true;
        this.totallength = set.length;
      }
      else {
        this.shownnotification = false;
      }

    })
  }

  ngOnInit(): void {

  }
  logout() {
    window.localStorage.clear();
    this.router.navigate(['login'])
  }
}
