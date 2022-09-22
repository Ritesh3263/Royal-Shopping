import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../service/general.service';
import { PaginationService } from '../service/pagination.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html'
})
export class BlogComponent implements OnInit {
  brandList: any = [];
  catergoryList: any = [];
  productList: any = [];
  pagination: any;
  showPage: boolean;
  currentPage: any = 1;
  loadingState: boolean;
  search: any;
  offerList: any = [];

  constructor(
    private generalService: GeneralService,
    private paginationService: PaginationService
  ) { }

  ngOnInit() {
    this.getList();
    this.getProductList();
    this.getOfferList();
  }

  getList() {
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

  getProductList() {
    this.generalService.getProductList({}).subscribe((res: any) => {
      if (res.success) {
        this.productList = res.data.data ? res.data.data : [];
      }
    });
  }

  getOfferList() {
    this.loadingState = true;
    const params: any = { page: this.currentPage }
    if (this.search && this.search && this.search != 'undefined' && this.search != 'null') {
      params.search = this.search;
    }

    this.generalService.getOfferList(params).subscribe((res: any) => {
      this.loadingState = false;
      if (res.success) {
        this.offerList = res.data.data ? res.data.data : [];
        this.showPage = res.data.pagination;
        this.pagination = this.paginationService.getPager(res.data.pagination['total_page'], this.currentPage);
      }
    });
  }

  getjson(data) {
    if (data)
      return JSON.parse(data);
  }
  searchAction(value) {
    this.search = value;
    this.getOfferList();
  }
  getPage(page: number) {
    this.currentPage = page;
    this.getOfferList();
  }

}
