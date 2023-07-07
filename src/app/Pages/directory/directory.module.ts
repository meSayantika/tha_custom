import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectoryComponent } from './directory.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes=[{
  path:'',
  component:DirectoryComponent,
  children:[
    { path: 'directory_home/:flag/:dataFlag/:id/:hotel_id', loadChildren: () => import('./directory-home/directory-home.module').then(m => m.DirectoryHomeModule) },
    { path: '', redirectTo: 'directory_home/:flag/:dataFlag/:id/:hotel_id', pathMatch: 'full' }
  ]
}]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DirectoryComponent]
})
export class DirectoryModule {
  constructor(){
    console.log("directory is loaded")

  }
 }
