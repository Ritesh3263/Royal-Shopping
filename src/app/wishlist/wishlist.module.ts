import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistComponent } from './wishlist.component';
import { Routes, RouterModule } from '@angular/router';
import { PaginationModule } from '../common/pagination/pagination.module';
import { LoderModule } from '../common/loder/loder.module';
import { GeneralService } from '../service/general.service';

const routes: Routes = [
  {
    path: '',
    component: WishlistComponent,
    data: { title: 'dashboard' }
  }
];


@NgModule({
  declarations: [WishlistComponent],
  imports: [
    CommonModule,
    PaginationModule,
    LoderModule,
    RouterModule.forChild(routes)
  ], providers: [GeneralService]
})
export class WishlistModule { }
