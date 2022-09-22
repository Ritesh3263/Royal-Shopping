import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoderComponent } from './loder.component';

@NgModule({
  declarations: [LoderComponent],
  imports: [
    CommonModule
  ],exports:[LoderComponent]
})
export class LoderModule { }
