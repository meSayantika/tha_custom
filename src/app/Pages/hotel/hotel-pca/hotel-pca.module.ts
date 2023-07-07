import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelPcaComponent } from './hotel-pca.component';
import { RouterModule, Routes } from '@angular/router';
import { PcaModule } from '../../Main/admin/pca/pca.module'
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MsgTemplateModule } from '../msg-template/msg-template.module';
import { MatTooltipModule } from "@angular/material/tooltip";

const routes:Routes=[
  {
    path:'',
    component:HotelPcaComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    PcaModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MsgTemplateModule,
    RouterModule.forChild(routes),
  ],
  declarations: [HotelPcaComponent],
})
export class HotelPcaModule {}
