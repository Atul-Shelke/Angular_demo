import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private toaster: ToastrService) { }

  data = new BehaviorSubject(null);

  // successfull toaster message..
  sucsessToaster(content: string) {
    this.toaster.success(content)
  }

  // error toaster message
  errorToaster(content: string) {
    this.toaster.error(content)
  }

}
