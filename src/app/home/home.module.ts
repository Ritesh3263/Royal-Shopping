import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormValidationModule } from '../form-validation/form-validation.module';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'dashboard' }
  }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    CarouselModule ,
    RouterModule.forChild(routes),
    FormValidationModule,
    FormsModule,ReactiveFormsModule
  ],
})
export class HomeModule { }
