import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepMngDashboardComponent } from './dep-mng-dashboard.component';
import { CommunicationsModule } from '../communications/communications.module';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs'
import { AddDeptempModule } from '../add-deptemp/add-deptemp.module';
import { DeptScheduleModule } from '../dept-schedule/dept-schedule.module';
import { MngCommunicationsModule } from '../mng-communications/mng-communications.module';
import { ChangeEmpSchModule } from '../change-emp-sch/change-emp-sch.module';
const routes:Routes=[
  {path:'',component:DepMngDashboardComponent}
]
@NgModule({
  imports: [
    CommonModule,
    CommunicationsModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatTabsModule,
    AddDeptempModule,
    DeptScheduleModule,
    MngCommunicationsModule,
    ChangeEmpSchModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DepMngDashboardComponent]
})
export class DepMngDashboardModule { }
