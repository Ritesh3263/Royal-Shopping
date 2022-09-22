import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    data: { title: 'view_profile' }
  },
  {
    path: 'edit',
    loadChildren: () => import('./edit-profile/edit-profile.module').then(m => m.EditProfileModule),
    data: { title: 'edit_profile' }
  },
];

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ProfileModule { }
