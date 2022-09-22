import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { Routes, RouterModule } from '@angular/router';
import { PaginationModule } from '../common/pagination/pagination.module';
import { GeneralService } from '../service/general.service';
import { LoderModule } from '../common/loder/loder.module';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: CartComponent,
    data: { title: 'dashboard' }
  }
];


@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    PaginationModule,
    LoderModule,
    SharedModule,
    RouterModule.forChild(routes)
  ], providers: [GeneralService]
})
export class CartModule { }
