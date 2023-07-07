import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestMsgComponent } from './guest-msg.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';
import { GuestDashboardModule } from '../../Main/admin/guest-dashboard/guest-dashboard.module';
const routes:Routes=[{
  path:'',
  component:GuestMsgComponent
}]
@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    GuestDashboardModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GuestMsgComponent]
})
export class GuestMsgModule { }
