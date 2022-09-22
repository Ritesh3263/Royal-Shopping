import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberDirective, FloatNumberDirective } from './directive/number.directive';
import { PricePipe, TransactionStatusPipe, TransactionIconsPipe } from './pipe/status.pipe';


@NgModule({
  declarations: [
    NumberDirective,
    FloatNumberDirective,
    PricePipe,
    TransactionStatusPipe,
    TransactionIconsPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NumberDirective,
    PricePipe,
    TransactionStatusPipe, 
    TransactionIconsPipe,
    FloatNumberDirective
  ]
})
export class SharedModule { }