import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundirectoryComponent } from './fundirectory.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AddSideMenuModule } from '../add-side-menu/add-side-menu.module';
import { ConfigureFunmenuModule } from '../configure-funmenu/configure-funmenu.module';
import { MatIconModule } from '@angular/material/icon';
import { AddSideMenuSectionModule } from '../add-side-menu-section/add-side-menu-section.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EntertainmentFunModule } from '../entertainment-fun/entertainment-fun.module';
const routes:Routes=[{
  path:'',
  component:FundirectoryComponent
}]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    AngularEditorModule,
    AddSideMenuModule,
    ConfigureFunmenuModule,
    MatIconModule,
    AddSideMenuSectionModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    EntertainmentFunModule,
    MatTooltipModule
  ],
  declarations: [FundirectoryComponent]
})
export class FundirectoryModule { }
