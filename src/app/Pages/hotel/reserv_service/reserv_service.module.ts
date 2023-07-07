import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reserv_serviceComponent } from './reserv_service.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes=[
  {path:'',component:Reserv_serviceComponent}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Reserv_serviceComponent]
})
export class Reserv_serviceModule { }
