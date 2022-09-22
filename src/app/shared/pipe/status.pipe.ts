import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'transactionStatus'
})
export class TransactionStatusPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let text = null;
    if (value) {
      switch (value.value) {
        case 1:
          text = `<small class="badge badge-pill badge-default">${value.label}</small>`;
          break;
        case 2:
          text = `<small class="badge badge-pill badge-primary">${value.label}</small>`;
          break;
        case 3:
          text = `<small class="badge badge-pill badge-success">${value.label}</small>`;
          break;
        case 4:
          text = `<small class="badge badge-pill badge-danger">${value.label}</small>`;
          break;
        default:
          text = null;
          break;
      }
      return text;
    }
  }
}

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return value ? parseFloat(value).toLocaleString(undefined, { minimumFractionDigits: 2 }) : '00';
    // return parseFloat(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}

@Pipe({
  name: 'transactionIcons'
})
export class TransactionIconsPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let text = null;
    if (value) {
      switch (value.value) {
        case 1:
          text = '<span class="la la-check-circle text-success"> </span>';
          break;
        case 2:
          text = '<span class="la la-times-circle text-danger"> </span>';
          break;
        case 3:
          text = '<span class="la la-check-circle text-success"> </span>';
          break;
        case 4:
          text = '<span class="la la-times-circle text-danger"> </span>';
          break;
        default:
          text = null;
          break;
      }
      return text;
    }
  }
}
