import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment, NeonBilling } from 'src/environments/environment';
import { NeonbillService } from '../../services/neonbill.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private Neonservice: NeonbillService, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    var CodeToken = this.route.snapshot.queryParams['code'] || null;
    if (CodeToken) {
      var data =
      {
        "code": CodeToken,
        "redirect_url": NeonBilling.redirect_url,
      }
      this.Neonservice.NeonToken(data).subscribe((tokendata) => {
        window.localStorage.setItem("NeonApitoken", JSON.stringify(tokendata))
      })

    }
  }

}
