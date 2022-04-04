import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormdetailsComponent } from './formdetails/formdetails.component';

const routes: Routes = [
    {
      path: '',
      component: HomeComponent
    },
    {
      path: 'formdetails/:mode',
      component: FormdetailsComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class FormRoutingModule { }