import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public Toast: ToastrService) { }

  Success(text: string) {
    this.Toast.success(text)
  }
  Error(text: string) {
    this.Toast.error(text);
  }

}
