import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelPromotionsComponent } from './hotel-promotions.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
const routes:Routes=[{

  path:'',
  component:HotelPromotionsComponent

}]
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HotelPromotionsComponent]
})
export class HotelPromotionsModule { }
