import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dept_loginComponent } from './dept_login.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
const routes:Routes=[{
  path:'',
  component:Dept_loginComponent
}]
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Dept_loginComponent]
})
export class Dept_loginModule { }
