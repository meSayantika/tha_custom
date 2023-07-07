import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Manage_ticketComponent } from './manage_ticket.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule, Routes } from '@angular/router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'
import { FormsModule } from '@angular/forms';
const routes:Routes=[
  {path:'',component:Manage_ticketComponent}
]

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    MatSlideToggleModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Manage_ticketComponent]
})
export class Manage_ticketModule { }
