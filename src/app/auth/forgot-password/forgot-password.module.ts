import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormValidationModule } from 'src/app/form-validation/form-validation.module';
import { AuthService } from 'src/app/service/auth.service';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordComponent,
    data: { title: 'forgot_password' }
  }
];

@NgModule({
  declarations: [
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormValidationModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    AuthService
  ]
})
export class ForgotPasswordModule { }
