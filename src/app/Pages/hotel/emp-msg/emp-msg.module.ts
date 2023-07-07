import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpMsgComponent } from './emp-msg.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';
import { AddDeptMngModule } from '../../Main/admin/add-dept-mng/add-dept-mng.module';
const routes:Routes=[{
  path:'',
  component:EmpMsgComponent
}]
@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    AddDeptMngModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EmpMsgComponent]
})
export class EmpMsgModule { }
