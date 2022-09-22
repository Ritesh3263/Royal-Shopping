declare var swal: any;
import { Component, OnInit } from '@angular/core';
import { errorMessage } from 'src/app/messages';
import { PaginationService } from 'src/app/service/pagination.service';
import { GeneralService } from '../service/general.service';
import { DataService } from '../service/data.service';
import { CommonService } from '../service/common.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html'
})
export class WishlistComponent implements OnInit {

  loadingState = false;
  objectArray: Array<any> = [];
  pagination: any = null;
  searchText: any = null;
  currentPage: any = 1;
  is_auth: boolean = false;

  constructor(
    private wishlistService: GeneralService,
    private paginationService: PaginationService,
    private dataService: DataService,
    private commonService: CommonService,
    private toster: ToastrService,
    private router: Router
  ) {
    this.dataService.isAuthenticated.subscribe((res) => {
      this.is_auth = res;
    });
  }

  ngOnInit() {
    this.getObjects();
  }

  getObjects() {
    this.loadingState = true;
    const params: any = { page: this.currentPage };
    if (this.searchText) {
      params.search = this.searchText;
    }
    this.wishlistService.getWishlist(params).subscribe((response) => {
      // console.log(response);
      this.loadingState = false;
      if (response.success) {
        this.objectArray = response.data.data;
        this.pagination = this.paginationService.getPager(response.data.pagination['total_page'], this.currentPage);
      } else {
        this.objectArray = [];
        this.pagination = null;
      }
    }, (error) => {
      this.loadingState = false;
      this.objectArray = [];
      this.pagination = null;
      // console.log(error);
    });
  }

  getPage(page: number) {
    this.currentPage = page;
    this.getObjects();
  }

  searchObject(text) {
    this.searchText = text;
    this.getObjects();
  }

  deleteObject(object) {
    swal.fire({
      title: errorMessage.delete_header_text,
      text: errorMessage.delete_smalll_text,
      icon: errorMessage.delete_dialogue_type,
      showCancelButton: true,
      confirmButtonText: errorMessage.delete_confirm_button,
      cancelButtonText: errorMessage.delete_cancel_button,
    }).then((result) => {
      if (result.value) {
        this.wishlistService.deleteWishlist(object.id).subscribe(
          (response) => {
            if (response.success) {
              this.getObjects();
              swal.fire(
                'Deleted!',
                'Your imaginary file has been deleted.',
                'success'
              )
            }
          },
        );
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    }).catch(swal.noop);
  }

  addToCartwithCheck(productitem: any) {
    if (this.is_auth) {
      this.wishlistService.checkProductonCart({ product_id: productitem.product_id }).subscribe((res: any) => {
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
        product_id: productitem.product_id,
        product_name: productitem.product_name,
        product_image: productitem.product_image,
        total_amount: productitem.price,
        product_company_id: productitem.product_company_id,
        price: productitem.price,
        quantity: 1,
        offer_id: productitem.offer_id,
      }
      this.wishlistService.addToCart(data).subscribe((res: any) => {
        this.loadingState = false;
        if (res.success) {
          this.toster.success("Product Add Sucsefully");
          this.wishlistService.deleteWishlist(productitem.id).subscribe(
            (response) => {
              if (response.success) {
                this.getObjects();
                swal.fire(
                  'Done!',
                  'Your Product Remove to Wishlist and Add To Cart',
                  'success'
                )
              }
            },
          );
          this.getProfile()
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
