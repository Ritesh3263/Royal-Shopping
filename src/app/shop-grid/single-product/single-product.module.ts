import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleProductComponent } from './single-product.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoderModule } from 'src/app/common/loder/loder.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { NgxEditorModule } from 'ngx-editor';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormValidationModule } from 'src/app/form-validation/form-validation.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginationModule } from 'src/app/common/pagination/pagination.module';

const routes: Routes = [
  {
    path: '',
    component: SingleProductComponent,
    data: { title: 'dashboard' }
  }
];

@NgModule({
  declarations: [SingleProductComponent],
  imports: [
    CommonModule,
    NgbModule,
    CarouselModule,
    LoderModule,
    PinchZoomModule, SharedModule,
    FormsModule, ReactiveFormsModule,
    FormValidationModule,
    SharedModule,
    NgxEditorModule,
    RouterModule.forChild(routes),
    PaginationModule
  ]
})
export class SingleProductModule { }
