import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelCreateCommComponent } from './hotel-create-comm.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';

const routes:Routes=[
  {
    path:'',
    component:HotelCreateCommComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    ImageCropperModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HotelCreateCommComponent]
})
export class HotelCreateCommModule { }
