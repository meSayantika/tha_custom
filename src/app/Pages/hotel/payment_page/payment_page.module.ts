import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Payment_pageComponent } from './payment_page.component';
import { RouterModule, Routes } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs'
import {MatButtonModule} from '@angular/material/button'
import {MatCardModule} from '@angular/material/card'
import {MatIconModule} from '@angular/material/icon'
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
const routes:Routes=[{
  path:'',
  component:Payment_pageComponent
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
    RouterModule.forChild(routes)
  ],
  declarations: [Payment_pageComponent]
})
export class Payment_pageModule { }
