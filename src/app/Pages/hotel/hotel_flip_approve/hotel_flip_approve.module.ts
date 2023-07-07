import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hotel_flip_approveComponent } from './hotel_flip_approve.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
const routes:Routes=[{
  path:'',
  component:Hotel_flip_approveComponent
}]
@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Hotel_flip_approveComponent]
})
export class Hotel_flip_approveModule { }
