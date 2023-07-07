import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeModuleComponent } from './change-module.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
const routes:Routes=[{
  path:'',
  component:ChangeModuleComponent
}]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSlideToggleModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChangeModuleComponent]
})
export class ChangeModuleModule { }
