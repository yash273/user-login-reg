import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentChildUserRoutingModule } from './parent-child-user-routing.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { DeleteUserComponent } from './dialog/delete-user/delete-user.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module'

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailsComponent,
    DeleteUserComponent
  ],
  imports: [
    CommonModule,
    ParentChildUserRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class ParentChildUserModule { }
