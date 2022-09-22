declare var swal: any;
import { Component, OnInit } from '@angular/core';
import { errorMessage } from 'src/app/messages';
import { PaginationService } from 'src/app/service/pagination.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/service/general.service';
import { DataService } from 'src/app/service/data.service';
import { filter } from 'rxjs-compat/operator/filter';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  loadingState = false;
  objectArray: Array<any> = [];
  pagination: any = null;
  searchText: any = null;
  currentPage: any = 1;
  is_auth: boolean = false;
  orderNoArray: any[];
  orderNoPaymentDetailsArray: any = [];

  constructor(
    private orderService: GeneralService,
    private paginationService: PaginationService,
    private dataService: DataService,
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
    this.orderService.getOrderist(params).subscribe((response) => {
      // console.log(response);
      this.loadingState = false;
      if (response.success) {
        this.objectArray = response.data.data;
        var a = [], b = response.data.data;
        b.forEach(function (value) {
          if (a.indexOf(value.order_number) == -1) a.push(value.order_number);
        });
        this.orderNoArray = a;
        this.orderNoPaymentDetails(a)
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

  orderNoPaymentDetails(a) {
    this.orderService.orderNoPaymentDetails(a).subscribe((res) => {
      return res.success ? this.orderNoPaymentDetailsArray = res.data : [];
    })
  }

  orderTotal(Ono) {
    let element;
    for (let index = 0; index < this.orderNoPaymentDetailsArray.length; index++) {
      if (Ono == this.orderNoPaymentDetailsArray[index].order_number) {
        element = this.orderNoPaymentDetailsArray[index].total_amount;
        break;
      }
    }
    return String(element);
  }
  cancleOrder(object) {
    // console.log(object);
  }
  printDiv(id) {
    var divContents = document.getElementById(id).innerHTML;
    var printWindow = window.open('', '', 'height=750,width=800');
    printWindow.document.write(`<html><head><title>Print Order : ${id}</title>`);
    printWindow.document.write('</head><body >');
    printWindow.document.write(divContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  }
}
