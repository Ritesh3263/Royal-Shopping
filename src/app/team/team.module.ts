import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TeamComponent,
    data: { title: 'dashboard' }
  }
];


@NgModule({
  declarations: [TeamComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TeamModule { }
