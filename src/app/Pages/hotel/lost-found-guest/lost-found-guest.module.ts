import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LostFoundGuestComponent } from './lost-found-guest.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip'
import { MsgTemplateModule } from '../msg-template/msg-template.module';
const routes:Routes=[{
  path:'',
  component:LostFoundGuestComponent
}]

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MsgTemplateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LostFoundGuestComponent]
})
export class LostFoundGuestModule { }
