import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelFlipComponent } from './hotel-flip.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

const routes:Routes=[
  {
    path:'',
    component:HotelFlipComponent
  }
]

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
    FormsModule,
    MatInputModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HotelFlipComponent]
})
export class HotelFlipModule { }
