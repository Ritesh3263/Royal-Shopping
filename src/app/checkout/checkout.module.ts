import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormValidationModule } from '../form-validation/form-validation.module';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    data: { title: 'dashboard' }
  }
];


@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    FormValidationModule,
    ReactiveFormsModule, FormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class CheckoutModule { }
