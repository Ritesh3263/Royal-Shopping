import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../service/general.service';
import { PaginationService } from '../service/pagination.service';
import { Options } from 'ng5-slider';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { CommonService } from '../service/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shop-grid',
  templateUrl: './shop-grid.component.html'
})
export class ShopGridComponent implements OnInit {
  catergoryList: any = [];
  brandList: any = [];
  category_id: any = {};
  brand_id: any = {};

  productList: any = [];
  value: number = 1;
  highValue: number = 299000;
  options: Options = {
    floor: 1,
    ceil: 299000
  };
  currentPage: any = 1;
  categoryBrandList: any = [];
  pagination: { currentPage: number; totalPages: number; startPage: number; endPage: number; pages: number[]; };
  showPage: any;
  loadingState: boolean = false;
  is_auth: boolean = false;
  search: any;

  constructor(
    private generalService: GeneralService,
    private paginationService: PaginationService,
    private route: ActivatedRoute,
    private dataService: DataService,
    private commonService: CommonService,
    private toster: ToastrService,
    private router: Router
  ) {
    this.brand_id.value = this.route.snapshot.paramMap.get('b_');
    this.brand_id.label = this.route.snapshot.paramMap.get('b_n');
    this.category_id.value = this.route.snapshot.paramMap.get('c_');
    this.category_id.label = this.route.snapshot.paramMap.get('c_n');
    this.search = this.route.snapshot.paramMap.get('s_');

    this.dataService.isAuthenticated.subscribe((res) => {
      this.is_auth = res;
    });
  }

  ngOnInit() {
    this.getMasterData();
    this.getProductList();
  }

  rangeChanged() {
    console.log(":::Prize" + this.value + " - " + this.highValue);
    this.getProductList();
  }

  getMasterData() {
    this.generalService.getCategoryList().subscribe((res: any) => {
      if (res.success) {
        this.catergoryList = res.data ? res.data : [];
      }
    });
    this.getBrandList();
  }

  getBrandList() {
    const params: any = {};
    if (this.category_id && this.category_id.value && this.category_id.value != 'undefined' && this.category_id.value != 'null') {
      params.category_id = this.category_id.value;
    }
    this.generalService.getBrandList(params).subscribe((res: any) => {

      if (res.success) {
        if (this.category_id && this.category_id.value) {
          this.categoryBrandList = res.data ? res.data : [];
        } else {
          this.brandList = res.data ? res.data : [];
        }
      }
    });
  }
  getProductList() {
    this.loadingState = true;
    const params: any = { page: this.currentPage }
    if (this.category_id && this.category_id.value && this.category_id.value != 'undefined' && this.category_id.value != 'null') {
      params.category_id = this.category_id.value;
    }
    if (this.search && this.search && this.search != 'undefined' && this.search != 'null') {
      params.search = this.search;
    }
    if (this.brand_id && this.brand_id.value && this.brand_id.value != 'undefined' && this.brand_id.value != 'null') {
      params.brand_id = this.brand_id.value;
    }
    if (this.value) {
      params.minprice = this.value;
    }
    if (this.highValue) {
      params.maxprice = this.highValue;
    }
    this.generalService.getProductList(params).subscribe((res: any) => {
      this.loadingState = false;
      if (res.success) {
        this.productList = res.data.data ? res.data.data : [];
        this.showPage = res.data.pagination;
        this.pagination = this.paginationService.getPager(res.data.pagination['total_page'], this.currentPage);
      }
    });
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: 'smooth'
    });
  }

  getPage(page: number) {
    this.currentPage = page;
    this.getProductList();
  }
  searchAction(value) {
    this.search = value;
    this.getProductList();
  }
  removeSearch() {
    this.search = null;
    this.getProductList();
  }

  categoryFiltter(object) {
    this.category_id = object;
    this.brand_id = {};
    this.getBrandList();
    this.getProductList();
  }

  brandFilter(object) {
    this.brand_id = object;
    this.category_id = {};
    this.getProductList();
  }
  getjson(data) {
    if (data)
      return JSON.parse(data);
  }
  onCategoryBrandFilter(object) {
    this.brand_id = object;
    this.getProductList();
  }

  removeCategoryFilter() {
    this.category_id = {};
    this.getProductList();
  }

  removeBrandFilter() {
    this.brand_id = {};
    this.getProductList();
  }

  addToCartwithCheck(productitem: any) {
    if (this.is_auth) {
      this.generalService.checkProductonCart({ product_id: productitem.id }).subscribe((res: any) => {
        if (res.success) {
          this.addToCart(productitem);
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

  addToCart(productitem: any) {
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
          this.toster.success("Product Add Sucsefully")
          this.getProfile()
        }
      });
    }
    else {
      this.router.navigateByUrl('/login');
    }
  }

  addToWishlistwithCheck(productitem: any) {
    if (this.is_auth) {
      this.generalService.checkProductonWishlist({ product_id: productitem.id }).subscribe((res: any) => {
        if (res.success) {
          this.addToWishlist(productitem);
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

  addToWishlist(productitem: any) {
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
          this.toster.success("Product Add Sucsefully")
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

}
