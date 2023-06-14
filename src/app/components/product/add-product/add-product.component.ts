import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common-services/common.service';
import { HttpRequestService } from 'src/app/common-services/http-request.service';
import * as $ from 'jquery';
declare var $: any;


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: ActivatedRoute, private http: HttpRequestService, private commonService: CommonService, private route: Router) { }

  productForm = this.formBuilder.group({
    title: ['', [Validators.required,]],
    price: ['', Validators.required],
    category: ['', Validators.required],
    description: ['', Validators.required]
  })

  parmsId: string;
  isEdit: boolean = false;


  ngOnInit(): void {

    this.commonService.data.subscribe(res => {
      this.parmsId = res;
      if (res) {
        this.getSingleProduct(res)
        this.isEdit = true;
        
      } else {
        this.productForm.reset();
        this.isEdit = false
        
      }
    })



    console.log("router ", this.router);

    if (this.parmsId) {
      this.isEdit = true;
      this.getSingleProduct(this.parmsId)

    } else {
      this.isEdit = false
    }

  }

  productCrud() {
    console.log("form data", this.productForm.value);

    if (this.productForm.valid) {

      if (this.parmsId) {

        this.http.request('other', 'patch', 'products/' + this.parmsId, this.productForm.value).subscribe(res => {
          console.log("update data", res);
          alert('Product Updated Successfully')
          // this.route.navigate(['/product/list'])

          $("#exampleModal").modal('hide');
        })

      } else {

        this.http.request('other', 'post', 'products', this.productForm.value).subscribe(res => {
          console.log("res", res);

          alert('Product Added Successfully')

          $("#exampleModal").modal('hide');

          // this.route.navigate(['/product/list'])
        })
      }

    } else {
      this.commonService.errorToaster('Invalid data')
    }

  }

  getSingleProduct(id: string) {
    this.http.request('other', 'get', 'products/' + id, null).subscribe(res => {
      console.log("id", id);


      this.productForm = this.formBuilder.group({
        title: [res.title, [Validators.required,]],
        price: [res.price, Validators.required],
        category: [res.category, Validators.required],
        description: [res.description, Validators.required]
      })
    })
  }

}
