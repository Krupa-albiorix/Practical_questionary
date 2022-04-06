import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FormdetailsComponent } from './formdetails/formdetails.component';
import { FormComponent } from './form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatComponentsModule } from '../mat-components.module';
import { FormRoutingModule } from './form-routing.module';

@NgModule({
  declarations: [
    FormComponent,
    HomeComponent,
    FormdetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatComponentsModule,
    FormRoutingModule
  ]
})
export class FormModule { }
