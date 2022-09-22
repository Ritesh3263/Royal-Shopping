declare var swal: any;
declare const Razorpay: any;

import { Component, HostListener, OnInit } from '@angular/core';
import { errorMessage } from 'src/app/messages';
import { PaginationService } from 'src/app/service/pagination.service';
import { GeneralService } from '../service/general.service';
import { DataService } from '../service/data.service';
import { CommonService } from '../service/common.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validatePhoneNumberFormControl, orderno } from '../common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit {

  loadingState = false;
  objectArray: any = [];
  pagination: any = null;
  searchText: any = null;
  currentPage: any = 1;
  total_amount: any = 0
  addForm: FormGroup;
  showLoader: boolean;
  currentUser: any;
  date = Date()
  // cardType: string;
  currentUserAddress: any;

  // Razopay
  rzp1: any
  options = {
    "key": "", // Enter the Key ID generated from the Dashboard
    "amount": 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "RoyalShop",
    "description": "",
    "image": "/favicon.ico",
    "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": (response) => {
      console.log("HEANDLER =====>", response);

      // Store On server.
      let event = new CustomEvent("payment.success",
        {
          detail: response,
          bubbles: true,
          cancelable: true
        }
      );
      window.dispatchEvent(event);
    },
    "prefill": {
      "name": "",
      "email": "",
      "contact": ""
    },
    "notes": {
      "address": " "
    },
    "theme": {
      "color": "#3399cc"
    },
  };

  constructor(
    private generalService: GeneralService,
    private paginationService: PaginationService,
    private dataService: DataService,
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastrService,
    private commonService: CommonService,
  ) {
    this.addForm = fb.group({
      first_name: ['', Validators.compose([Validators.required])],
      last_name: ['', Validators.compose([Validators.required])],
      country: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      district: ['', Validators.compose([Validators.required])],
      pincode: ['', Validators.compose([Validators.required])],
      phone_number: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(14)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      product: [''],
      order_no: [''],
      order_total: [0],
      cart_subtotal: [0],
      shipping_charges: [200],
      shipping_user_id: ['1'],
      full_name_card: ['', Validators.compose([Validators.required])],
      payment_type: ['razopay']
      // card_number: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(15)])],
      // ex_mm: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(2)])],
      // ex_yy: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(2)])],
      // cvv: [null, Validators.compose([Validators.required, Validators.min(100), Validators.max(9999)])],
    });
  }

  ngOnInit() {
    // this.cardType = 'false';
    this.getObjects();
    this.setUserDetais();
  }

  getObjects() {
    this.loadingState = true;
    const params: any = { page: this.currentPage };
    if (this.searchText) {
      params.search = this.searchText;
    }
    this.generalService.getCheckOutList(params).subscribe((response) => {
      // console.log(response);
      this.loadingState = false;
      if (response.success) {
        this.objectArray = response.data.data;
        this.total_amount = response.data.total_amount;
        this.pagination = this.paginationService.getPager(response.data.pagination['total_page'], this.currentPage);
        if (!(this.objectArray.length > 0)) {
          this.router.navigateByUrl('/cart');
          this.toast.info("something wrong data", "Cart Amount Zero");
        }
      } else {
        this.objectArray = [];
        this.pagination = null;
        this.toast.info("something wrong data");
      }
    }, (error) => {
      this.loadingState = false;
      this.objectArray = [];
      this.pagination = null;
      this.toast.info("something wrong data");
      // console.log(error);
    });
  }

  getPage(page: number) {
    this.currentPage = page;
    this.getObjects();
  }

  setUserDetais() {
    this.dataService.currentUser.subscribe((res) => {
      if (res) {
        this.currentUser = res;
        this.addForm.patchValue({
          first_name: this.currentUser.first_name,
          last_name: this.currentUser.last_name,
          full_name_card: `${this.currentUser.first_name} ${this.currentUser.last_name}`,
          phone_number: this.currentUser.phone_number,
          email: this.currentUser.email,
        });
      }
    });
    this.dataService.currentUserAddress.subscribe((res) => {
      if (res) {
        this.currentUserAddress = res;
        this.addForm.patchValue({
          country: this.currentUserAddress.country,
          state: this.currentUserAddress.state,
          address: this.currentUserAddress.street_address,
          district: this.currentUserAddress.district,
          pincode: this.currentUserAddress.pincode,
        });
      }
    });
  }

  submitForm(): void {
    if (this.addForm.valid) {
      this.showLoader = true;
      this.addForm.patchValue({
        cart_subtotal: this.total_amount,
        product: this.objectArray,
        order_total: (this.total_amount + this.addForm.value.shipping_charges),
        order_no: orderno()
      });

      this.options.key = environment.RazopayKey;
      this.options.amount = Number(this.addForm.value.order_total * 1)
      // this.options.order_id = this.addForm.value.order_no
      this.options.prefill.name = this.addForm.value.full_name_card
      this.options.prefill.email = this.addForm.value.email
      this.options.prefill.contact = this.addForm.value.phone_number

      let rzp1 = new Razorpay(this.options);
      rzp1.open();
      rzp1.on('payment.failed', function (response) {
        // Todo - store this information in the server
        console.log("FAILED  HEANDLER+++>", response);

      });

    }
  }

  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event): void {
    console.log("HostListener", event);
    this.generalService.addOrder({ ...this.addForm.value, p_g_r: event.detail }).subscribe((response: any) => {
      this.showLoader = false;
      if (response.success) {
        this.toast.success(response.massage, response.title);
        this.getProfile();
        this.router.navigateByUrl('/order');
      } else {
        this.showLoader = false;
        response.error.map(obj => {
          if (obj.hasOwnProperty('title')) {
            // this.formErrors.title = obj.title;
          }

        });
      }
    });
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
  // GetCardType() {
  //   var number = this.addForm.value.card_number;
  //   console.log(number);

  //   // visa
  //   var re = new RegExp("^4");
  //   if (number.match(re) != null)
  //     this.cardType = "Visa";

  //   // Mastercard
  //   // Updated for Mastercard 2017 BINs expansion
  //   if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number))
  //     this.cardType = "Mastercard";

  //   // AMEX
  //   re = new RegExp("^3[47]");
  //   if (number.match(re) != null)
  //     this.cardType = "AMEX";

  //   // Discover
  //   re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
  //   if (number.match(re) != null)
  //     this.cardType = "Discover";

  //   // Diners
  //   re = new RegExp("^36");
  //   if (number.match(re) != null)
  //     this.cardType = "Diners";

  //   // Diners - Carte Blanche
  //   re = new RegExp("^30[0-5]");
  //   if (number.match(re) != null)
  //     this.cardType = "Diners - Carte Blanche";

  //   // JCB
  //   re = new RegExp("^35(2[89]|[3-8][0-9])");
  //   if (number.match(re) != null)
  //     this.cardType = "JCB";

  //   // Visa Electron
  //   re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
  //   if (number.match(re) != null)
  //     this.cardType = "Visa Electron";

  //   // this.cardType = "Invalid";
  // }
}
