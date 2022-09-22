import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { PaginationModule } from '../common/pagination/pagination.module';
import { LoderModule } from '../common/loder/loder.module';
import { GeneralService } from '../service/general.service';

const routes: Routes = [
  {
    path: '',
    component: OrderListComponent,
    data: { title: 'dashboard' }
  }
];


@NgModule({
  declarations: [OrderListComponent],
  imports: [
    CommonModule,
    PaginationModule,
    LoderModule,
    RouterModule.forChild(routes)
  ], providers: [GeneralService]
})

export class OrderModule { }
