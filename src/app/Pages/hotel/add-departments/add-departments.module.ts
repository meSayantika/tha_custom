import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDepartmentsComponent } from './add-departments.component';
import { RouterModule, Routes } from '@angular/router';
import { AddDeptModule } from '../../Main/admin/add-dept/add-dept.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

const routes:Routes=[
  {
    path:'',
    component:AddDepartmentsComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    AddDeptModule,
    MatCardModule,
    MatIconModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddDepartmentsComponent]
})
export class AddDepartmentsModule { }
