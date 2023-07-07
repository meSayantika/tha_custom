import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelPromoOnclickComponent } from './hotel-promo-onclick.component';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MsgTemplateModule } from '../msg-template/msg-template.module';

const routes:Routes=[{
  path:'',
  component:HotelPromoOnclickComponent
}]
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MsgTemplateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HotelPromoOnclickComponent]
})
export class HotelPromoOnclickModule { }
