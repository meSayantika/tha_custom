import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddManagersComponent } from './add-managers.component';
import { RouterModule, Routes } from '@angular/router';
import { AddEmpModule } from '../../Main/admin/add-emp/add-emp.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
const routes:Routes=[{
  path:'',
  component:AddManagersComponent
}]
@NgModule({
  imports: [
    CommonModule,
    AddEmpModule,
    MatCardModule,
    MatIconModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddManagersComponent]
})
export class AddManagersModule { }
