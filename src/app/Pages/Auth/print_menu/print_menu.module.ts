import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Print_menuComponent } from './print_menu.component';
import { RouterModule, Routes } from '@angular/router';
const routes:Routes=[
  {
    path:'',
    component:Print_menuComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Print_menuComponent]
})
export class Print_menuModule { }
