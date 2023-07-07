import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book_resComponent } from './book_res.component';
import { RouterModule, Routes } from '@angular/router';
import { Booking_headerModule } from './book_res_home/booking_header/booking_header.module';
const routes:Routes=[{
  path:'',
  component:Book_resComponent,
  children:[ { path: 'home/:hotel_id/:flag/:id/:name', loadChildren: () => import('./book_res_home/book_res_home.module').then(m => m.Book_res_homeModule) },
  { path: '', redirectTo: 'home', pathMatch: 'full' }]
}]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    Booking_headerModule
  ],
  declarations: [Book_resComponent]
})
export class Book_resModule { }
