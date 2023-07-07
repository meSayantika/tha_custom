import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelCreatePropComponent } from './hotel-create-prop.component';
import { RouterModule, Routes } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs'
import {MatButtonModule} from '@angular/material/button'
import {MatCardModule} from '@angular/material/card'
import {MatIconModule} from '@angular/material/icon'
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
const routes:Routes=[{
  path:'',
  component:HotelCreatePropComponent
}]
@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HotelCreatePropComponent]
})
export class HotelCreatePropModule { }
