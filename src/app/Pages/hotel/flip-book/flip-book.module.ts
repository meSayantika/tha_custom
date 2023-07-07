import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlipBookComponent } from './flip-book.component';
import { RouterModule, Routes } from '@angular/router';
const routes:Routes=[{
  path:'',
  component:FlipBookComponent
}]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FlipBookComponent]
})
export class FlipBookModule { }
