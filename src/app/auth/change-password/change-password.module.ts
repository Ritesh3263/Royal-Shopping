import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChangePasswordComponent } from './change-password.component';
import { AuthService } from 'src/app/service/auth.service';
import { FormValidationModule } from 'src/app/form-validation/form-validation.module';

const routes: Routes = [
  {
    path: '',
    component: ChangePasswordComponent
  },
];

@NgModule({
  declarations: [
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    FormValidationModule,
    SharedModule
  ],
  providers: [
    AuthService
  ]
})
export class ChangePasswordModule { }
