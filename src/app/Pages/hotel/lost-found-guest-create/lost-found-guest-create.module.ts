import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LostFoundGuestCreateComponent } from './lost-found-guest-create.component';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
const routes:Routes=[{
  path:'',
  component:LostFoundGuestCreateComponent
}]
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatIconModule
  ],
  declarations: [LostFoundGuestCreateComponent]
})
export class LostFoundGuestCreateModule { }
