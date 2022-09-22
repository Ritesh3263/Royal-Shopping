import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../service/general.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  // encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  formErrors = {
    semail: null
  };
  subscribeForm: FormGroup;
  newProducts: Array<any> = [];
  productList: any = [];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  catergoryList: any = [];
  brandList: any = [];
  topOfferList: any = [];
  constructor(private generalservice: GeneralService, private fBuilder: FormBuilder,) {
    this.subscribeForm = this.fBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
    });
  }

  ngOnInit() {
    this.getNewProduct();
    this.getMasterData();
  }
  getjson(data) {
    if (data)
      return JSON.parse(data);
  }
  getNewProduct() {
    this.generalservice.getNewProductList({}).subscribe((res: any) => {
      if (res.success) {
        this.newProducts = res.data;
      }
    })
  }

  getAllProduct() {
    this.generalservice.getNewProductList({}).subscribe((res: any) => {
      if (res.success) {
        this.newProducts = res.data;
      }
    })
  }

  getMasterData() {
    this.generalservice.getCategoryList().subscribe((res: any) => {
      if (res.success) {
        this.catergoryList = res.data ? res.data : [];
      }
    });
    this.generalservice.getBranddataList({}).subscribe((res: any) => {
      if (res.success) {
        this.brandList = res.data ? res.data : [];
      }
    });
    this.generalservice.getTopOfferList({}).subscribe((res: any) => {
      if (res.success) {
        this.topOfferList = res.data ? res.data : [];
      }
    });
  }

  userSubscribe(): void {
    if (this.subscribeForm.valid) {
      this.generalservice.addSubscribe(this.subscribeForm.value).subscribe((response: any) => {
        if (response.success) {
          // console.log(response);
          this.formErrors.semail = "Subscription Successful";
          this.subscribeForm.reset;
        } else { this.formErrors.semail = "subscription Failed"; }
      }, (error) => {
        this.formErrors.semail = "subscription Failed";
        // console.log('In error', error);
      });
      setTimeout(() => {
        this.formErrors.semail = null
      }, 5000);
    }
  }

}
