import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectoryPlaceholderComponent } from './directory-placeholder.component';
import { YourDirectoryModule } from '../your-directory/your-directory.module';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
const routes:Routes=[{
  path:'',
  component:DirectoryPlaceholderComponent
}]
@NgModule({
  imports: [
    CommonModule,
    YourDirectoryModule,
    RouterModule.forChild(routes),
    MatCardModule

  ],
  declarations: [DirectoryPlaceholderComponent]
})
export class DirectoryPlaceholderModule { }
