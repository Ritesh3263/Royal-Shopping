import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditProfileComponent } from './edit-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthService } from 'src/app/service/auth.service';
import { FormValidationModule } from 'src/app/form-validation/form-validation.module';

const routes: Routes = [
  {
    path: '',
    component: EditProfileComponent
  },
];
@NgModule({
  declarations: [
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FormValidationModule,
    NgSelectModule
  ],
  providers: [
    AuthService
  ]
})
export class EditProfileModule { }
