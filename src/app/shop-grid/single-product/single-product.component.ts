import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/service/general.service';
import { DataService } from 'src/app/service/data.service';
import { CommonService } from 'src/app/service/common.service';
import { ToastrService } from 'ngx-toastr';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DOMSerializer } from 'prosemirror-model';
import { schema } from 'ngx-editor';
import { PaginationService } from 'src/app/service/pagination.service';
declare var Swal: any;
@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html'
})
export class SingleProductComponent implements OnInit {
  catergoryList: any = [];
  currentRate = 3;
  brandList: any = [];

  currentimg: any = "assets/images/product/1.jpg";
  viewId: any;
  objectArray: any;
  loadingState: boolean = false;
  is_auth: boolean = false;
  qty: number = 1;
  relatedCatProdArray: any = [];
  relatedBrandProdArray: any = [];
  relatedCmpProdArray: any = []

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
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
  }
  category_id: any;
  company_id: any;
  brand_id: any;
  addForm: FormGroup;
  currentUser: any;
  formErrors: Boolean = false;
  customerReviewList: any = [];
  currentPage: number = 1;
  pagination: any;
  productImageArray: any = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private generalService: GeneralService,
    private dataService: DataService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private paginationService: PaginationService,
    private toster: ToastrService,
    private router: Router
  ) {
    this.dataService.isAuthenticated.subscribe((res) => {
      this.is_auth = res;
    });
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.viewId = this.activatedRoute.snapshot.paramMap.get('id');
    }

    this.addForm = fb.group({
      name: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      subject: [null, Validators.compose([Validators.required])],
      quality_rate: [2, Validators.compose([Validators.required])],
      price_rate: [3, Validators.compose([Validators.required])],
      value_rate: [4, Validators.compose([Validators.required])],
      massage: [''],
      product_id: ['']
    });
  }

  ngOnInit(): void {

    this.getMasterData();
    this.generalService.getsingleproductDetails(this.viewId).subscribe((response: any) => {
      if (response.success) {
        this.objectArray = response.data;
        this.setUserdata();
        this.getReviewlist();
        if (this.objectArray.image) {
          this.currentimg = this.objectArray.image;
        }
        if (this.objectArray.company_id) {
          this.company_id = this.objectArray.company_id;
        }
        if (this.objectArray.category_id) {
          this.category_id = JSON.parse(this.objectArray.category_id);
        }
        if (this.objectArray.brand_id) {
          this.brand_id = JSON.parse(this.objectArray.brand_id);
        }
        this.getReletedData();
        if (this.objectArray.product_detail) {
          const contentNode = schema.nodeFromJSON(JSON.parse(response.data.product_detail));
          const html = DOMSerializer.fromSchema(schema).serializeFragment(contentNode.content);
          document.getElementById("prodetails").appendChild(html);
        }
      }
    });
    this.getProductImages();
  }
  setUserdata() {
    if (this.is_auth) {
      this.dataService.currentUser.subscribe((res) => {
        this.currentUser = res;
      });
      this.addForm.patchValue({
        name: this.currentUser.name,
        email: this.currentUser.email,
        product_id: this.objectArray.id
      })
    }
  }

  getProductImages() {
    const params: any = {};
    if (this.viewId) {
      params.product_id = this.viewId;
    }
    this.generalService.getProductImageList(params).subscribe((response) => {
      if (response.success) {
        this.productImageArray = response.data.data;
        if (this.productImageArray.length > 0)
          this.productImageArray.push({ id: "1", image: this.objectArray.image })
      } else {
        this.productImageArray = [];
      }
    }, (error) => {
      this.productImageArray = [];
    });
  }

  getMasterData() {
    this.generalService.getCategoryList().subscribe((res: any) => {
      if (res.success) {
        this.catergoryList = res.data ? res.data : [];
      }
    });
    this.generalService.getBrandList({}).subscribe((res: any) => {
      if (res.success) {
        this.brandList = res.data ? res.data : [];
      }
    });
  }
  getjson(data) {
    if (data)
      return JSON.parse(data);
  }

  getReletedData() {
    const cat_params: any = {};
    const brand_params: any = {};
    const cmp_params: any = {}
    if (this.category_id) {
      cat_params.category_id = this.category_id.value;
    }

    if (this.company_id) {
      cmp_params.company_id = this.company_id;
    }
    if (this.brand_id) {
      brand_params.brand_id = this.brand_id.value;
    }
    this.generalService.getNewProductList(brand_params).subscribe((res: any) => {
      if (res.success) {
        this.relatedBrandProdArray = res.data ? res.data : [];
      }
    });
    this.generalService.getNewProductList(cmp_params).subscribe((res: any) => {
      if (res.success) {
        this.relatedCmpProdArray = res.data ? res.data : [];
      }
    });
    this.generalService.getNewProductList(cat_params).subscribe((res: any) => {
      if (res.success) {
        this.relatedCatProdArray = res.data ? res.data : [];
      }
    });

  }

  imgchange(img) {
    this.currentimg = img;
  }

  addToCartwithCheck() {
    if (this.is_auth) {
      this.generalService.checkProductonCart({ product_id: this.objectArray.id }).subscribe((res: any) => {
        if (res.success) {
          this.addToCart()
        } else {
          this.toster.error(res.error)
          this.router.navigateByUrl('/cart');
        }
      });
    }
    else {
      this.router.navigateByUrl('/login');
    }
  }

  zero(a: any) {
    if (a.data == 0) {
      this.qty = 1;
    }
    if (a.data == null)
      this.qty = 1;
  }
  addToCart() {
    if (this.is_auth) {
      this.loadingState = true;
      const data: any = {
        product_id: this.objectArray.id,
        product_name: this.objectArray.name,
        product_image: this.objectArray.image,
        total_amount: (this.objectArray.price * (this.qty ? this.qty > 0 ? this.qty : 1 : 1)),
        price: this.objectArray.price,
        quantity: this.qty ? this.qty > 0 ? this.qty : 1 : 1,
        product_company_id: this.objectArray.company_id,
        offer_id: this.objectArray.offer_id,
      }
      this.generalService.addToCart(data).subscribe((res: any) => {
        this.loadingState = false;
        if (res.success) {
          this.toster.success("Product Add Successfully")
          this.router.navigateByUrl('/cart');
          this.getProfile();
        }
      });
    }
    else {
      this.router.navigateByUrl('/login');
    }
  }

  getProfile() {
    this.commonService.getProfile().subscribe((response) => {
      if (response.success) {
        this.dataService.updateAuth(response.data.User);
        this.dataService.updateCart(response.data.cart);
        this.dataService.updateAddress(response.data.address);
      }
    }, (error) => {
      this.dataService.purgeAuth();
    });
  }

  addToWishlistwithCheck() {
    if (this.is_auth) {
      this.generalService.checkProductonWishlist({ product_id: this.objectArray.id }).subscribe((res: any) => {
        if (res.success) {
          this.addToWishlist();
        } else {
          this.toster.error(res.error)
          this.router.navigateByUrl('/wishlist');
        }
      });
    }
    else {
      this.router.navigateByUrl('/login');
    }
  }

  addToWishlist() {
    if (this.is_auth) {
      this.loadingState = true;
      const data: any = {
        product_id: this.objectArray.id,
        product_name: this.objectArray.name,
        product_image: this.objectArray.image,
        product_company_id: this.objectArray.company_id,
        price: this.objectArray.price,
        quantity: 1,
        offer_id: this.objectArray.offer_id,
      }
      this.generalService.addToWishlist(data).subscribe((res: any) => {
        this.loadingState = false;
        if (res.success) {
          this.router.navigateByUrl('/wishlist');
          this.toster.success("Product Add Successfully")
        }
      });
    }
    else {
      this.router.navigateByUrl('/login');
    }
  }

  //releted data

  raddToCartwithCheck(productitem: any) {
    if (this.is_auth) {
      this.generalService.checkProductonCart({ product_id: productitem.id }).subscribe((res: any) => {
        if (res.success) {
          this.raddToCart(productitem);
        } else {
          this.toster.error(res.error)
          this.router.navigateByUrl('/cart');
        }
      });
    }
    else {
      this.router.navigateByUrl('/login');
    }
  }

  raddToCart(productitem: any) {
    if (this.is_auth) {
      this.loadingState = true;
      const data: any = {
        product_id: productitem.id,
        product_name: productitem.name,
        product_image: productitem.image,
        total_amount: productitem.price,
        price: productitem.price,
        product_company_id: productitem.company_id,
        quantity: 1,
        offer_id: productitem.offer_id,
      }
      this.generalService.addToCart(data).subscribe((res: any) => {
        this.loadingState = false;
        if (res.success) {
          this.toster.success("Product Add Successfully")
          this.getProfile()
        }
      });
    }
    else {
      this.router.navigateByUrl('/login');
    }
  }

  raddToWishlistwithCheck(productitem: any) {
    if (this.is_auth) {
      this.generalService.checkProductonWishlist({ product_id: productitem.id }).subscribe((res: any) => {
        if (res.success) {
          this.raddToWishlist(productitem);
        } else {
          this.toster.error(res.error)
          this.router.navigateByUrl('/wishlist');
        }
      });
    }
    else {
      this.router.navigateByUrl('/login');
    }
  }

  raddToWishlist(productitem: any) {
    if (this.is_auth) {
      this.loadingState = true;
      const data: any = {
        product_id: productitem.id,
        product_name: productitem.name,
        product_image: productitem.image,
        price: productitem.price,
        quantity: 1,
        product_company_id: productitem.company_id,
        offer_id: productitem.offer_id,
      }
      this.generalService.addToWishlist(data).subscribe((res: any) => {
        this.loadingState = false;
        if (res.success) {
          this.toster.success("Product Add Successfully")
        }
      });
    }
    else {
      this.router.navigateByUrl('/login');
    }
  }

  /// submit review
  submitForm(formdata): void {
    if (this.is_auth) {
      if (this.addForm.valid) {
        this.generalService.addCustomerReview(formdata.value).subscribe((response) => {
          if (response.success) {
            this.addForm.reset();
            this.setUserdata();
            this.addForm.patchValue({ subject: ' ' })
            this.getReviewlist();
            this.showmsg();
          } else {
            this.formErrors = true;
          }
        });
      }
    } else {
      this.router.navigateByUrl('/login');
    }
  }
  showmsg() {
    window.location.hash = '#mcvncmxvncxmvnxcm';
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      text: 'Your Review has been saved',
      title: `<font color='darkorchid'>Thank You ${this.currentUser.name}`,
      showConfirmButton: false,
      timer: 3000
    })
  }

  getReviewlist() {
    const params: any = { page: this.currentPage }
    if (this.objectArray.id) {
      params.product_id = this.objectArray.id;
    }
    this.generalService.getCustomerReviewList(params).subscribe((res: any) => {
      if (res.success) {
        this.customerReviewList = res.data.data ? res.data.data : [];
        this.pagination = this.paginationService.getPager(res.data.pagination['total_page'], this.currentPage);

      }
    });
  }
  getPage(page: number) {
    this.currentPage = page;
    this.getReviewlist();
  }

  pagechange(data) {
    if (data && data.id) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([`/shop-grid/${data.id}`]);
      });
    }
  }
}
