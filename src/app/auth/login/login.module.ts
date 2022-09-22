import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormValidationModule } from 'src/app/form-validation/form-validation.module';
import { PinComponent } from './pin/pin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoderModule } from 'src/app/common/loder/loder.module';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: { title: 'login' }
  },
  {
    path: 'pin',
    component: PinComponent,
    data: { title: 'login' }
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    PinComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormValidationModule,
    SharedModule,
    LoderModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    AuthService
  ]
})
export class LoginModule { }
