
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common-services/common.service';
import { HttpRequestService } from 'src/app/common-services/http-request.service';
import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  constructor(private http: HttpRequestService, private commonService: CommonService) { }

  dataList: any = []


  ngOnInit(): void {
    console.log('hgvgjvjhvvvvvvvhh')

    this.getProductList();

  }

  // get project list

  getProductList() {
    this.http.request('other', 'get', 'products', null).subscribe(res => {
      console.log("product list is", res);
      this.dataList = res
    })
  }

  // delete product
  deleteRecord(id: string) {

    this.http.request('other', 'delete', 'products/' + id, null).subscribe(res => {
      console.log("record delre", res);

      this.commonService.sucsessToaster('Record delete succesfully')
      this.getProductList();


    })
  }

  // update record
  updateRecord(id: string) {
      $("#exampleModal").modal('show');
      this.commonService.data.next(id)
  }

  addProduct()
  {
    $("#exampleModal").modal('show');
    this.commonService.data.next(null)

  }

}
