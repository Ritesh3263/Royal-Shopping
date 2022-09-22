import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormValidationModule } from 'src/app/form-validation/form-validation.module';
import { AuthService } from 'src/app/service/auth.service';

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordComponent,
    data: { title: 'reset_password' }
  }
];

@NgModule({
  declarations: [
    ResetPasswordComponent
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
export class ResetPasswordModule { }
