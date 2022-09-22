import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { Routes, RouterModule } from '@angular/router';
import { PaginationModule } from '../common/pagination/pagination.module';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    data: { title: 'dashboard' }
  }
];


@NgModule({
  declarations: [BlogComponent],
  imports: [
    CommonModule,
    PaginationModule,
    RouterModule.forChild(routes)
  ]
})
export class BlogModule { }
