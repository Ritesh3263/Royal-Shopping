import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404Component } from './error404.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: Error404Component,
    data: { title: 'dashboard' }
  }
];

@NgModule({
  declarations: [Error404Component],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class Error404Module { }
