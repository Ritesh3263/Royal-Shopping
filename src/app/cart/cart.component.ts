declare var swal: any;
import { Component, OnInit } from '@angular/core';
import { errorMessage } from 'src/app/messages';
import { PaginationService } from 'src/app/service/pagination.service';
import { GeneralService } from '../service/general.service';
import { CommonService } from '../service/common.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

  loadingState = false;
  objectArray: Array<any> = [];
  pagination: any = null;
  searchText: any = null;
  currentPage: any = 1;
  total_amount: number = 0;

  constructor(
    private cartservice: GeneralService,
    private paginationService: PaginationService,
    private commonService: CommonService,
    private dataService: DataService
  ) {

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
    this.cartservice.getCartList(params).subscribe((response) => {
      // console.log(response);
      this.loadingState = false;
      if (response.success) {
        this.objectArray = response.data.data;
        this.total_amount = response.data.total_amount;
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
        this.cartservice.deleteCart(object.id).subscribe(
          (response) => {
            if (response.success) {
              this.getObjects();
              this.getProfile();
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

  productQuantity(v, item) {
    if (v && v.target.value && v.target.value > 0) {
      const data = {
        total_amount: Number(item.price * Number(v.target.value)),
        quantity: Number(v.target.value),
        price: item.price
      }
      setTimeout(() => {
        this.cartservice.editCart(item.id, data).subscribe((res) => {
          if (res.success) {
            this.getObjects()
          }
        })
      }, 500);
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
