import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopGridComponent } from './shop-grid.component';
import { Routes, RouterModule } from '@angular/router';
import { Ng5SliderModule } from 'ng5-slider';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from '../common/pagination/pagination.module';
import { LoderModule } from '../common/loder/loder.module';

const routes: Routes = [
  {
    path: '',
    component: ShopGridComponent,
    data: { title: 'Shop Grid', isShowMultiCarolus: true }
  },
  {
    path: ':id',
    loadChildren: () => import('./single-product/single-product.module').then(m => m.SingleProductModule),
    data: { title: 'Shop Grid', isShowMultiCarolus: false }
  }
];

@NgModule({
  declarations: [ShopGridComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    Ng5SliderModule,
    FormsModule,
    PaginationModule,
    LoderModule,
    RouterModule.forChild(routes)
  ]
})
export class ShopGridModule { }
