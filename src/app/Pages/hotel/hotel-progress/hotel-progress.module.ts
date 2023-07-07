import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelProgressComponent } from './hotel-progress.component';
import { ViewHotelModule } from '../../Main/admin/view-hotel/view-hotel.module';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MsgTemplateModule } from '../msg-template/msg-template.module';
const routes:Routes=[
  {
    path:'',
    component:HotelProgressComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    ViewHotelModule,
    MatIconModule,
    MatCardModule,
    MsgTemplateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HotelProgressComponent]
})
export class HotelProgressModule { }
