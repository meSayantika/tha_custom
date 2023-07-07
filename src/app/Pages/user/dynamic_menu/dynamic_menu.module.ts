import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dynamic_menuComponent } from './dynamic_menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon'
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
const routes:Routes=[{
  path:'',
  component:Dynamic_menuComponent
}]
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    RouterModule.forChild(routes)

  ],
  declarations: [Dynamic_menuComponent]
})
export class Dynamic_menuModule {
  constructor(){
  console.log('dynamic menu module loaded')
  }
 }
