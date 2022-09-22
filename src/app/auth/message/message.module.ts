import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

const routes: Routes = [
  {
    path: '',
    component: MessageComponent,
  },
];


@NgModule({
  declarations: [
    MessageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    AuthService
  ]
})
export class MessageModule { }
