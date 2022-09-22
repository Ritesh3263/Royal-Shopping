import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDetailsComponent } from './portfolio-details.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PortfolioDetailsComponent,
    data: { title: 'dashboard' }
  }
];


@NgModule({
  declarations: [PortfolioDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PortfolioDetailsModule { }
