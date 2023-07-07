import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuggestionBoxComponent } from './suggestion-box.component';
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
  component:SuggestionBoxComponent
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
  declarations: [SuggestionBoxComponent]
})
export class SuggestionBoxModule { }
