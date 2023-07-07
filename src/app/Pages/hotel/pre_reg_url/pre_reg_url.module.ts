import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pre_reg_urlComponent } from './pre_reg_url.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
const routes:Routes=[{
  path:'',
  component:Pre_reg_urlComponent
 }]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule
  ],
  declarations: [Pre_reg_urlComponent]
})
export class Pre_reg_urlModule { }
