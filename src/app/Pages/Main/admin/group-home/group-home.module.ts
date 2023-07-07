import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupHomeComponent } from './group-home.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs'
import { AddGroupMemberModule } from '../add-group-member/add-group-member.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { GroupCommunicationsModule } from '../group-communications/group-communications.module';
const routes:Routes=[
  {
    path:'',
    component:GroupHomeComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatTabsModule,
    AddGroupMemberModule,
    ReactiveFormsModule,
    FormsModule,
    MatTooltipModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    GroupCommunicationsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GroupHomeComponent]
})
export class GroupHomeModule { }
